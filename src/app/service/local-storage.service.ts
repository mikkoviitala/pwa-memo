import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

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

  getRegisteredUser(): string {
    return localStorage.getItem(constants.REGISTERED_USER) || null;
  }

  setRegisteredUser(username: string): void {
    localStorage.setItem(constants.REGISTERED_USER, username);
  }

  deleteRegisteredUser(): void {
    localStorage.removeItem(constants.REGISTERED_USER);
  }

  getLoggedInUser(): string {
    return localStorage.getItem(constants.LOGGED_IN_USER) || null;
  }

  setLoggedInUser(username: string): void {
    localStorage.setItem(constants.LOGGED_IN_USER, username);
  }

  deleteLoggedInUser(): void {
    localStorage.removeItem(constants.LOGGED_IN_USER);
  }

  getRememberMe(): boolean {
    return localStorage.getItem(constants.REMEMBER_ME) === 'true' || false;
  }

  setRememberMe(remember: boolean): void {
    localStorage.setItem(constants.REMEMBER_ME, remember ? 'true' : 'false');
  }

  getLanguage(): string {
    const language = localStorage.getItem(constants.LANGUAGE);
    return environment.languages.includes(language) ? language : environment.defaultLanguage;
  }

  setLanguage(language: string): void {
    localStorage.setItem(constants.LANGUAGE, language);
  }

  getLayout(): string {
    return localStorage.getItem(constants.LAYOUT) || 'grid';
  }

  setLayout(layout: string): void {
    localStorage.setItem(constants.LAYOUT, layout);
  }
}
