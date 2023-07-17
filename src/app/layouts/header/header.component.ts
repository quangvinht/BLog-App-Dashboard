import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    const userData: any = localStorage.getItem('user');
    this.userEmail = JSON.parse(userData).email;
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  handleLogout(): void {
    this.authService.logOut();
  }
}
