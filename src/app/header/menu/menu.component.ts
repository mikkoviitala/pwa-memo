import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user.interface';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  user: User;
  disabled: boolean;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private guard: AuthenticatedGuard) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user: User) => {
      this.user = user;
      this.disabled = !user || !user.isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async logOut() {
    await this.authService.revoke();
    await this.guard.canActivate();
  }
}
