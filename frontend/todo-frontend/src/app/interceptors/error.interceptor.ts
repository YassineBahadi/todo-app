import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router=inject(Router);

  return next(req).pipe(
    catchError(error=>{
      if(error.status===401){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['/login']);
      }
      return throwError(()=>error);
    })
  );
};
