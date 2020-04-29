import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
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
    return this.router.url === '/login';
  }
}
