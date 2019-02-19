import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {ErrorsInterceptorService} from './errors-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptorService, multi: true },
];
