import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

const constants = {
  REGISTERED_USER: 'registered_user',
  LOGGED_IN_USER: 'logged_in_user',
  REMEMBER_ME: 'remember_me',
  LANGUAGE: 'language',
  LAYOUT: 'layout'
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  get registeredUser(): string {
    return localStorage.getItem(constants.REGISTERED_USER) || null;
  }

  set registeredUser(username: string) {
    localStorage.setItem(constants.REGISTERED_USER, username);
  }

  deleteRegisteredUser(): void {
    localStorage.removeItem(constants.REGISTERED_USER);
  }

  get loggedInUser(): string {
    return localStorage.getItem(constants.LOGGED_IN_USER) || null;
  }

  set loggedInUser(username: string) {
    localStorage.setItem(constants.LOGGED_IN_USER, username);
  }

  deleteLoggedInUser(): void {
    localStorage.removeItem(constants.LOGGED_IN_USER);
  }

  get rememberMe(): boolean {
    return localStorage.getItem(constants.REMEMBER_ME) === 'true' || false;
  }

  set rememberMe(remember: boolean) {
    localStorage.setItem(constants.REMEMBER_ME, remember ? 'true' : 'false');
  }

  get language(): string {
    const language = localStorage.getItem(constants.LANGUAGE);
    return environment.languages.includes(language) ? language : environment.defaultLanguage;
  }

  set language(language: string) {
    localStorage.setItem(constants.LANGUAGE, language);
  }

  get layout(): string {
    return localStorage.getItem(constants.LAYOUT) || 'grid';
  }

  set layout(layout: string) {
    localStorage.setItem(constants.LAYOUT, layout);
  }
}
