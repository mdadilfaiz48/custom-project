import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Mobile } from './pages/product/mobile/mobile';
import { Laptop } from './pages/product/laptop/laptop';
import { Car } from './pages/car/car';
import { authGuard } from './auth-guard';
import { AddCart } from './pages/add-cart/add-cart';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'addCart', component: AddCart },

  { path: 'login', component: Login },
  { path: 'signUp', component: SignUp },

  { path: 'contact', component: Contact, canActivate: [authGuard] },
  { path: 'about', component: About, canActivate: [authGuard] },

  {
    path: 'product',
    canActivate: [authGuard],
    children: [
      { path: 'laptop', component: Laptop },
      { path: 'mobile', component: Mobile },
      { path: 'car', component: Car },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
