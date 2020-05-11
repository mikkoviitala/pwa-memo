import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user.interface';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: Observable<User>;

  constructor(
    private authService: AuthService,
    private guard: AuthenticatedGuard) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  async logOut() {
    await this.authService.revoke();
    await this.guard.canActivate();
  }
}
