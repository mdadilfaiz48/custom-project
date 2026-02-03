import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // ✅ 1. FIRST check browser
  if (typeof window === 'undefined') {
    return false;
  }

  // ✅ 2. THEN safely access sessionStorage
  const loggedIn = window.sessionStorage.getItem('isLoggedIn');

  console.log('LoggedIn:', loggedIn);

  // ✅ 3. Allow only if true
  if (loggedIn !== 'true') {
    router.navigate(['login']);
    return false;
  }

  return true;
};
