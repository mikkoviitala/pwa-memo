import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {BaseGuard} from './base.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard extends BaseGuard implements CanActivate {
  constructor(protected router: Router, protected authService: AuthService) {
    super(router, authService);
    this.redirectTo = '/login';
  }
}
