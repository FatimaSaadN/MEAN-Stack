import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../components/popup/popup.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
  imports: [CommonModule, PopupComponent, HeaderComponent]
})
export class LogoutComponent implements OnInit {
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authService.logoutService();
    this.popupMessage = 'Logout Successful!';
    this.showPopup = true;

    setTimeout(() => {
      this.showPopup = false;
      this.router.navigate(['/login']);
    }, 3000);
  }
}
