import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {API, graphqlOperation} from '@aws-amplify/api';
import {Memo} from '../model/memo.class';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  private memos: BehaviorSubject<Memo[]> = new BehaviorSubject<Memo[]>([]);

  constructor() {
  }

  get(): Observable<Memo[]> {
    this._getMemosFromServer();
    return this.memos.asObservable();
  }

  insert(memo: Memo): void {
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

    from(API.graphql(graphqlOperation(query, variables)))
      .pipe(first())
      .subscribe(
        (next) => {
          const stored = this.memos.getValue();
          stored.push(Memo.fromObject(next));
          this.memos.next(stored);
        });
  }

  update(memo: Memo): void {
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
      .subscribe(
        (next) => {
          const stored = this.memos.getValue();
          const oldMemo = stored.find(current => current.id === memo.id);
          stored[stored.indexOf(oldMemo)] = memo;
          this.memos.next(stored);
        });
  }

  delete(memo: Memo): void {
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
      .subscribe(
        () => {
          let stored = this.memos.getValue();
          stored = stored.filter(current => current.id !== memo.id);
          this.memos.next(stored);
        });
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
        first(),
      )
      .subscribe(
        (next) => {
          const memos = Memo.fromCollection(next);
          this.memos.next(memos);
        });
  }
}
