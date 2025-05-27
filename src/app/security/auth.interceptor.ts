import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('authInterceptor intercepting', req);

  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getToken(); // assuming you have a getToken() method

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(cloned);
};
