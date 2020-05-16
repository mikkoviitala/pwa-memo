import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {API, graphqlOperation} from '@aws-amplify/api';
import {first} from 'rxjs/operators';
import {Memo} from '../models/memo.class';
import {OnlineService} from './online.service';
import Dexie from 'dexie';

const DATABASE_NAME = 'PwaMemo';

export enum BackendOperation {
  INSERT = 1,
  UPDATE = 2,
  DELETE = 3
}

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  private database: any;
  private suppressUpdates: boolean;
  private readonly memos: BehaviorSubject<Memo[]> = new BehaviorSubject<Memo[]>(null);

  constructor(private onlineService: OnlineService) {
    this._createDatabase();
    this._watchOnlineEvents(onlineService);
  }

  getMemos(): Observable<Memo[]> {
    this._getMemosFromServer();
    return this.memos.asObservable();
  }

  async insertMemo(memo: Memo) {
    const query = `mutation create($name: String, $description: String, $date: AWSDateTime) {
      createMemo(input: {
        name: $name,
        description: $description,
        date: $date
      }) { id name description date }
    }`;
    const variables = {
      name: memo.name,
      description: memo.description,
      date: memo.date
    };

    if (this.onlineService.isOnline) {
      from(API.graphql(graphqlOperation(query, variables)))
        .pipe(first())
        .subscribe(next => this._insert(Memo.fromGraphQLObject(next)));
    } else {
      memo = await this._addBackendOperation(BackendOperation.INSERT, memo);
      this._insert(memo);
    }
  }

  private _insert(memo: Memo) {
    if (this.suppressUpdates) {
      return;
    }
    const stored = this.memos.getValue();
    stored.push(memo);
    this.memos.next(stored);
  }

  async updateMemo(memo: Memo) {
    if (this.onlineService.isOnline) {
      const query = `mutation update($id: ID!, $name: String, $description: String, $date: AWSDateTime) {
        updateMemo(input: {
          id: $id,
          name: $name,
          description: $description,
          date: $date
        }) { id name description date }
      }`;
      const variables = {
        id: memo.id,
        name: memo.name,
        description: memo.description,
        date: memo.date
      };

      if (memo.id) {
        from(API.graphql(graphqlOperation(query, variables)))
          .pipe(first())
          .subscribe(() => this._update(memo));
      } else {
        await this.database.memos.update(memo.requestId, {
          name: memo.name,
          description: memo.description
        });
        this._update(memo);
      }
    } else {
      if (!memo.requestId) {
        memo = await this._addBackendOperation(BackendOperation.UPDATE, memo);
      } else {
        await this.database.memos.update(memo.requestId, {
          name: memo.name,
          description: memo.description
        });
      }
      this._update(memo);
    }
  }

  private _update(memo: Memo): void {
    if (this.suppressUpdates) {
      return;
    }
    const stored = this.memos.getValue();
    const oldMemo = stored.find(current => current.id === memo.id);
    stored[stored.indexOf(oldMemo)] = memo;
    this.memos.next(stored);
  }

  async deleteMemo(memo: Memo) {
    if (memo.requestId) {
      await this.database.memos.delete(memo.requestId);
      this._delete(memo, 'requestId');
    } else {
      if (this.onlineService.isOnline) {
        const query = `mutation delete($id: ID!) {
          deleteMemo(input: {
            id: $id
            }) { id }
          }`;
        const variables = {
          id: memo.id
        };

        from(API.graphql(graphqlOperation(query, variables)))
          .pipe(first())
          .subscribe(() => this._delete(memo, 'id'));
      } else {
        memo = await this._addBackendOperation(BackendOperation.DELETE, memo);
        this._delete(memo, 'id');
      }
    }
  }

  private _delete(memo: Memo, property: string): void {
    if (this.suppressUpdates) {
      return;
    }
    let stored = this.memos.getValue();
    stored = stored.filter(current => current[property] !== memo[property]);
    this.memos.next(stored);
  }

  private _getMemosFromServer(): void {
    const query = `{
        listMemos {
          items {
            id, name, description, date
          }
        }
      }`;

    from(API.graphql(graphqlOperation(query)))
      .pipe(
        first()
      )
      .subscribe(
        (next) => {
          const memos = Memo.fromGraphQLCollection(next);
          this.memos.next(memos);
        });
  }

  private _watchOnlineEvents(onlineService: OnlineService) {
    onlineService.onlineStateChanged.subscribe(async online => {
      if (online) {
        console.log('browser online, synchronizing with backend');
        await this._synchronizeWithBackend();
      } else {
        console.log('browser offline, storing locally');
      }
    });
  }

  private _createDatabase(): void {
    this.database = new Dexie(DATABASE_NAME);
    this.database.version(1).stores({
      memos: '++requestId, operation, id, name, description, date'
    });
  }

  private _addBackendOperation(operation: BackendOperation, memo: Memo): Memo {
    return this.database.memos
      .add({
        operation,
        id: memo.id,
        name: memo.name,
        description: memo.description,
        date: memo.date
      })
      .then((requestId: number) => {
        memo.requestId = requestId;
        memo.operation = operation;
        return memo;
      })
      .catch(e => console.log(e.stack || e));
  }

  private async _synchronizeWithBackend() {
    this.suppressUpdates = true;
    const records: any[] = await this.database.memos.toArray();

    for (const record of records) {
      const memo: Memo = new Memo(record);
      memo.requestId = undefined;

      switch (record.operation) {
        case BackendOperation.INSERT:
          await this.insertMemo(memo);
          break;
        case BackendOperation.UPDATE:
          await this.updateMemo(memo);
          break;
        case BackendOperation.DELETE:
          await this.deleteMemo(memo);
          break;
        default:
          break;
      }

      await this.database.memos.delete(record.requestId);
    }

    this.suppressUpdates = false;
    this.memos.next([]);
    setTimeout(() => this._getMemosFromServer(), 500);
  }
}
