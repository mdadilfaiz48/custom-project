import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  let authReq = req;

  // ✅ Attach token safely
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // ✅ Handle unauthorized / forbidden
      if (error?.status === 401 || error?.status === 403) {
        sessionStorage.clear();

        // Prevent navigation loop
        if (router.url !== '/login') {
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    }),
  );
};
