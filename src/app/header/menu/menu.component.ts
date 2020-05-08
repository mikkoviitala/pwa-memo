import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user.interface';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: User;
  disabled: boolean;

  constructor(
    private authService: AuthService,
    private guard: AuthenticatedGuard) {
  }

  ngOnInit(): void {
    this.authService.auth.subscribe((user: User) => {
      this.user = user;
      this.disabled = !user || !user.isLoggedIn;
    });
  }

  async logOut() {
    await this.authService.revoke();
    await this.guard.canActivate();
  }
}
