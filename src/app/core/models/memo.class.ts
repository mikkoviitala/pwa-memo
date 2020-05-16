import {BackendOperation} from '../services/memo.service';

export class Memo {
  id: string | null;
  name: string | null;
  description: string | null;
  date: string;
  requestId?: number;
  operation?: BackendOperation;

  constructor(obj?: any) {
    obj = obj ? obj : {};

    this.id = obj.id || null;
    this.name =  obj.name || null;
    this.description = obj.description || null;
    this.date = obj.date || (new Date()).toISOString();
    this.requestId = obj.requestId || undefined;
    this.operation = obj.operation || undefined;
  }

  static fromGraphQLObject(response: any): Memo {
    return new Memo(response.data.createMemo);
  }

  static fromGraphQLCollection(response: any): Memo[] {
    const memos: Memo[] = [];
    const objs = response.data.listMemos.items;
    objs.forEach(obj => memos.push(new Memo(obj)));
    return memos;
  }
}
