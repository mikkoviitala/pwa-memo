import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {AuthenticatedGuard} from '../../../guards/authenticated.guard';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: Observable<User>;

  constructor(
    private authService: AuthenticationService,
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
