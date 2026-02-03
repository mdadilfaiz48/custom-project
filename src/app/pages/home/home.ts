import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}

  goToCart() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      // value in storage is string "true"
      this.router.navigate(['/addCart']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
