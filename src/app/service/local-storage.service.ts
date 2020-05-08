import {Injectable} from '@angular/core';

const REGISTERED_USER = 'registered_user';
const LOGGED_IN_USER = 'logged_in_user';
const REMEMBER_ME = 'remember_me';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setRegisteredUser(username: string): void {
    localStorage.setItem(REGISTERED_USER, username);
  }

  getRegisteredUser(): string {
    return localStorage.getItem(REGISTERED_USER) || null;
  }

  deleteRegisteredUser(): void {
    localStorage.removeItem(REGISTERED_USER);
  }

  setLoggedInUser(username: string): void {
    localStorage.setItem(LOGGED_IN_USER, username);
  }

  getLoggedInUser(): string {
    return localStorage.getItem(LOGGED_IN_USER) || null;
  }

  deleteLoggedInUser(): void {
    localStorage.removeItem(LOGGED_IN_USER);
  }

  setRememberMe(remember: boolean): void {
    localStorage.setItem(REMEMBER_ME, remember ? 'true' : 'false');
  }

  getRememberMe(): boolean {
    return localStorage.getItem(REMEMBER_ME) === 'true' || false;
  }
}
