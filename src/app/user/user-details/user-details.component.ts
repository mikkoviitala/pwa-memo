import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../model/user.interface';
import {AuthenticatedGuard} from '../../service/guard/authenticated.guard';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private guard: AuthenticatedGuard) {
  }

  ngOnInit(): void {
    this.authService.auth.subscribe(user => this.user = user);
  }

  async signOut() {
    await this.authService.revoke();
    await this.guard.canActivate();
  }
}
