import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import {Memo} from '../models/memo.class';

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

  constructor() {
    this._createDatabase();
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
    return this.database.memos.update(memo.requestId, {
      name: memo.name,
      description: memo.description
    });
  }

  async deleteQueued(memo: Memo): Promise<any> {
    return this.database.memos.delete(memo.requestId);
  }

  async clearQueue(): Promise<any> {
    return this.database.memos.clear();
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
        memo.requestId = requestId;
        memo.operation = operation;
        return memo;
      })
      .catch(e => console.log(e.stack || e));
  }
}
