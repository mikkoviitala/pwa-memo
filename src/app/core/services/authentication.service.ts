// adapted from
// amplify auth as observable https://dev.to/beavearony/aws-amplify-auth-angular-rxjs-simple-state-management-3jhd

import {Injectable} from '@angular/core';
import Auth from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {SnackbarService} from './snackbar.service';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types/Auth';
import {CognitoUser, ISignUpResult} from 'amazon-cognito-identity-js';
import {catchError, first} from 'rxjs/operators';
import {User} from '../models/user.interface';
import {ResetPassword} from '../models/reset-password.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private unknownUser = {
    name: null,
    isLoggedIn: false
  } as User;

  private readonly user = new BehaviorSubject<User>(this.unknownUser);

  constructor(private snackbarService: SnackbarService) {
    // Get the user on creation of this service
    Auth.currentAuthenticatedUser().then(
      (user: any) => this._setUser(user),
      () => this._setUser(null)
    );

    // Use Hub channel 'auth' to get notified on changes
    Hub.listen('auth', ({payload: {event, data}}) => {
      this._handleHubResponse(event, data);
    });
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  isAuthenticated(): Promise<any> {
    return Auth.currentAuthenticatedUser()
      .then(
        () => new Promise<boolean>(resolve => resolve(true)),
        () => new Promise<boolean>(resolve => resolve(false)));
  }

  authenticate(user: SignInOpts): Observable<CognitoUser | null> {
    return from(Auth.signIn(user)).pipe(
      first(),
      catchError(() => of(null))
    );
  }

  async revoke(): Promise<any> {
    return Auth.signOut();
  }

  registerNewUser(user: SignUpParams): Observable<ISignUpResult> {
    return from(Auth.signUp(user)).pipe(
      first(),
      catchError(() => of(null))
    );
  }

  verify(username: string, code: string): Observable<any> {
    return from(Auth.confirmSignUp(username, code)).pipe(
      first(),
      catchError(() => of(null))
    );
  }

  resendVerificationCode(username: string): Observable<string> {
    return from(Auth.resendSignUp(username)).pipe(
      first(),
      catchError(() => of(null))
    );
  }

  requestCode(username: string): Observable<any> {
    return from(Auth.forgotPassword(username)).pipe(
      first(),
      catchError(() => of(null))
    );
  }

  resetPassword(params: ResetPassword): Observable<void> {
    return from(Auth.forgotPasswordSubmit(params.username, params.code, params.password)).pipe(first());
  }

  private _handleHubResponse(event: any, data: any): void {
    if (event === 'signIn') {
      this._setUser(data);
    } else if (event === 'signIn_failure') {
      this._setUser(null);
      this.snackbarService.show('error.invalid-credentials');
    } else if (event === 'signOut') {
      this._setUser(null);
    } else if (event === 'signUp_failure') {
      if (data.code === 'UsernameExistsException') {
        this.snackbarService.show('error.user-exists');
      } else {
        this.snackbarService.show('error.unknown-error', {param: data.code});
      }
    }
  }

  private _setUser(cognitoUser: any) {
    if (cognitoUser) {
      this.user.next({
        name: cognitoUser.username,
        isLoggedIn: true
      });
    } else {
      this.user.next(this.unknownUser);
    }
  }
}
