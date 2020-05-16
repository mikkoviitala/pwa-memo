import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {API, graphqlOperation} from '@aws-amplify/api';
import {first} from 'rxjs/operators';
import {Memo} from '../models/memo.class';
import {OnlineService} from './online.service';
import {BackendOperation, MemoQueueService} from './memo-queue.service';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private suppressUpdates: boolean;
  private readonly memos: BehaviorSubject<Memo[]> = new BehaviorSubject<Memo[]>(null);

  constructor(
    private memoQueueService: MemoQueueService,
    private onlineService: OnlineService) {
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
      memo = await this.memoQueueService.addToInsertQueue(memo);
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
      if (memo.id) {
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

        from(API.graphql(graphqlOperation(query, variables)))
          .pipe(first())
          .subscribe(() => this._update(memo));
      } else {
        await this.memoQueueService.updateQueued(memo);
        this._update(memo);
      }
    } else {
      if (!memo.requestId) {
        memo = await this.memoQueueService.addToUpdateQueue(memo);
      } else {
        await this.memoQueueService.updateQueued(memo);
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
      await this.memoQueueService.deleteQueued(memo);
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
        memo = await this.memoQueueService.addToDeleteQueue(memo);
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
        await this._synchronizeWithBackend();
      }
    });
  }

  private async _synchronizeWithBackend() {
    this.suppressUpdates = true;
    const memos: Memo[] = await this.memoQueueService.getQueue();

    for (const memo of memos) {
      memo.requestId = undefined;

      switch (memo.operation) {
        case BackendOperation.INSERT:
          await setTimeout(() => this.insertMemo(memo), 100);
          break;
        case BackendOperation.UPDATE:
          await setTimeout(() => this.updateMemo(memo), 100);
          break;
        case BackendOperation.DELETE:
          await setTimeout(() => this.deleteMemo(memo), 100);
          break;
        default:
          break;
      }
    }

    this.suppressUpdates = false;
    this.memos.next([]);

    setTimeout(async () => {
      await this.memoQueueService.clearQueue();
      this._getMemosFromServer();
    }, 500);
  }
}
