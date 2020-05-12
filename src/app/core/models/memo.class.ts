export class Memo {
  id: string | null;
  name: string | null;
  description: string | null;
  date: string;

  constructor(id?: string, name?: string, description?: string, date?: string) {
    this.id = id || null;
    this.name = name || null;
    this.description = description || null;
    this.date = date || (new Date()).toISOString();
  }

  static fromObject(response: any): Memo {
    const item = response.data.createMemo;
    return item as Memo;
  }

  static fromCollection(response: any): Memo[] {
    const memos = [];
    const items = response.data.listMemos.items;
    items.forEach(item => memos.push(item as Memo));
    return memos as Memo[];
  }
}
