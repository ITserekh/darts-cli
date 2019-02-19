import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
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
      if (err instanceof HttpErrorResponse) {
        if (err.error.errorInfo.error.indexOf('10001') > -1 ) {
          window.alert('зарегистрируйтесь');
        }
      }
      return throwError(err);

    }), (event: Observable<HttpEvent<any>>) => {
        event.subscribe(item => {
          if (item instanceof HttpResponse) {
            // console.log(item.body);
            // console.log(item.headers);
          }});
      return event;
    }
      );
  }
}
