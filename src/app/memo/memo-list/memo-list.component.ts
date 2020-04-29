import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';
import {API, graphqlOperation} from '@aws-amplify/api';


@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss']
})
export class MemoListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private guard: AuthenticatedGuard) {
  }

  async ngOnInit() {
    await this.guard.canActivate();
  API.graphql().l
    this.subscription = API.graphql(
      graphqlOperation(ListMemos)
    ) as Observable<object>;

    this.subscription.subscribe({
      next: (sourceData) => {
        const newRestaurant = (sourceData as any).value.data.onCreateRestaurant
        this.restaurants = [newRestaurant, ...this.restaurants];
      }
    });
    /*this.subscription = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['login']);
      }
    });*/
    /*
        const query = `{
        listMemos {
          items {
            id, name, description, date
          }
        }
      }`;
     */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
