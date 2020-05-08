// adapted from
// amplify auth as observable https://dev.to/beavearony/aws-amplify-auth-angular-rxjs-simple-state-management-3jhd

import {Injectable} from '@angular/core';
import Auth from '@aws-amplify/auth';
import {Hub} from '@aws-amplify/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user.interface';
import {SignInOpts} from '@aws-amplify/auth/src/types/Auth';
import {SnackbarService} from './snackbar.service';
import {SignUpParams} from '@aws-amplify/auth/lib-esm/types/Auth';
import {ResetPassword} from '../model/reset-password.interface';
import {CognitoUser} from "amazon-cognito-identity-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private unknownUser = {
    isLoggedIn: false,
    id: null,
    username: null,
  } as User;

  private readonly authState = new BehaviorSubject<User>(this.unknownUser);
  private unconfirmedUsername: string = null;
  readonly auth = this.authState.asObservable();

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

  isAuthenticated(): Promise<any> {
    return Auth.currentAuthenticatedUser()
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  authenticate(user: SignInOpts): Promise<boolean> {
    return Auth.signIn(user)
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  async revoke() {
    return Auth.signOut();
  }

  registerNewUser(user: SignUpParams): Promise<boolean> {
    return Auth.signUp(user)
      .then((response) => {
        this._setUnconfirmedUsername(response.user.getUsername());
        return this._resolve(true);
      }, () => this._resolve(false));
  }

  verify(username: string, code: string): Promise<boolean> {
    return Auth.confirmSignUp(username, code)
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  resendVerificationCode(username: string): Promise<boolean> {
    this._setUnconfirmedUsername(username);
    return Auth.resendSignUp(username)
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  requestCode(username: string): Promise<boolean> {
    this._setUnconfirmedUsername(username);
    return Auth.forgotPassword(username)
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  resetPassword(params: ResetPassword): Promise<boolean> {
    this._setUnconfirmedUsername(params.username);
    return Auth.forgotPasswordSubmit(params.username, params.code, params.password)
      .then(() => this._resolve(true), () => this._resolve(false));
  }

  getUnconfirmedUsername(): string | null {
    return this.unconfirmedUsername || null;
  }

  private _setUnconfirmedUsername(username: string) {
    this.unconfirmedUsername = username;
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
        this.snackbarService.show('error.unknown-error', { param: data.code });
      }
    }
  }

  private _setUser(cognitoUser: any) {
    if (cognitoUser) {
      this.authState.next({
        isLoggedIn: true,
        id: cognitoUser.attributes.sub,
        username: cognitoUser.username
      });
    } else {
      this.authState.next(this.unknownUser);
    }
  }

  private _resolve(value: any): Promise<any> {
    return new Promise<any>(resolve => resolve(value));
  }
}
