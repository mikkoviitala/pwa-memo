import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
          if (this._isUnauthorized(error) && !this.isLoginRoute()) {
            this.authService.revoke()
              .then(() => this.router.navigate(['login'])
              .then(() => window.location.reload()));
          }
          throw error;
        }
      ));
  }

  private _isUnauthorized(error: any): boolean {
    return error && error.status === 401;
  }

  private isLoginRoute(): boolean {
    return this.router.url.indexOf('login') > -1;
  }
}
