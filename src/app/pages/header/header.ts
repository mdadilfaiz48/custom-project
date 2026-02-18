import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.clear(); // 🔥 clear token + data

    this.router.navigate(['/login'], {
      replaceUrl: true, // prevents back navigation
    });
  }
}
