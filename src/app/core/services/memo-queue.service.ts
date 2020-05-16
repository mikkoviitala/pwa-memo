import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Memo} from '../models/memo.class';
import {BehaviorSubject, Observable} from 'rxjs';

const DATABASE_NAME = 'PwaMemo';

export enum BackendOperation {
  INSERT = 1,
  UPDATE = 2,
  DELETE = 3
}

@Injectable({
  providedIn: 'root'
})
export class MemoQueueService {
  private database: any;
  private countChanged = new BehaviorSubject<number>(0);

  constructor() {
    this._createDatabase();
    this._setCount();
  }

  get count(): Observable<number> {
    return this.countChanged.asObservable();
  }

  async getQueue(): Promise<Memo[]> {
    const memos: Memo[] = [];
    const records: any[] = await this.database.memos.toArray();
    for (const record of records) {
      const memo: Memo = new Memo(record);
      memos.push(memo);
    }
    return memos;
  }

  addToInsertQueue(memo: Memo): Memo {
    return this._addToQueue(BackendOperation.INSERT, memo);
  }

  addToUpdateQueue(memo: Memo): Memo {
    return this._addToQueue(BackendOperation.UPDATE, memo);
  }

  addToDeleteQueue(memo: Memo): Memo {
    return this._addToQueue(BackendOperation.DELETE, memo);
  }

  async updateQueued(memo: Memo): Promise<any> {
    const result = await this.database.memos.update(memo.requestId, {
      name: memo.name,
      description: memo.description
    });
    this._setCount();
    return result;
  }

  async deleteQueued(memo: Memo): Promise<any> {
    const result = await this.database.memos.delete(memo.requestId);
    this._setCount();
    return result;
  }

  async clearQueue(): Promise<any> {
    const result = await this.database.memos.clear();
    this._setCount();
    return result;
  }

  private _createDatabase(): void {
    this.database = new Dexie(DATABASE_NAME);
    this.database.version(1).stores({
      memos: '++requestId, operation, id, name, description, date'
    });
  }

  private _addToQueue(operation: BackendOperation, memo: Memo): Memo {
    return this.database.memos
      .add({
        operation,
        id: memo.id,
        name: memo.name,
        description: memo.description,
        date: memo.date
      })
      .then((requestId: number) => {
        this._setCount();

        memo.requestId = requestId;
        memo.operation = operation;
        return memo;
      })
      .catch(e => console.log(e.stack || e));
  }

  private _setCount(): void {
    this.database.memos.count()
      .then(items => this.countChanged.next(items));
  }
}
