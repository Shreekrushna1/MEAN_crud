import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
export const authGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthServiceService);
const router = inject(Router);
  if(localStorage.getItem('token')){
    return true;
  } else{
    router.navigate(['login']);
    return false;
  }
};
