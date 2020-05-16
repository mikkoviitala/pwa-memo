import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BaseGuard implements CanActivate {
  protected invertCanActivate: boolean;
  protected redirectTo: string;

  constructor(
    protected router: Router,
    protected authService: AuthenticationService) {
  }

  async canActivate(): Promise<boolean> {
    let canActivate = await this.authService.isAuthenticated();
    if (this.invertCanActivate) {
      canActivate = !canActivate;
    }

    if (!canActivate) {
      await this.router.navigate([this.redirectTo]);
    }
    return canActivate;
  }
}
