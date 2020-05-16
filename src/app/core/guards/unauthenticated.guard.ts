import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {BaseGuard} from './base.guard';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard extends BaseGuard implements CanActivate {
  constructor(protected router: Router, protected authService: AuthenticationService) {
    super(router, authService);
    this.invertCanActivate = true;
    this.redirectTo = '/memo';
  }
}
