import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Check if running in browser
  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = sessionStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;

    if (Date.now() > expiry) {
      sessionStorage.clear();
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (error) {
    sessionStorage.clear();
    router.navigate(['/login']);
    return false;
  }
};
