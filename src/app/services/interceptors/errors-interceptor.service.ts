import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable({
  providedIn: 'root'
})
export class ErrorsInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      this.router.navigate(['/login']);
      const error = err.error.message || err.statusText;
      console.log('------Http Error');
      console.log(error);
      return throwError(error);
    }));
  }
}
