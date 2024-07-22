import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../components/popup/popup.component';
import { HeaderComponent } from "../../components/header/header.component";
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  private idleTimer: any;
  private readonly idleDuration = 5000; 

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.logout();
    // if (isPlatformBrowser(this.platformId)) {
    //   this.resetIdleTimer();
    // }
  }

  ngOnDestroy(): void {
    clearTimeout(this.idleTimer);
  }

  logout() {
    this.authService.logoutService();
    this.popupMessage = 'Logout Successful!';
    this.showPopup = true;
    this.router.navigate(['/login']);

   
  }
  // private resetIdleTimer(): void {
  //   clearTimeout(this.idleTimer);
  //   this.idleTimer = setTimeout(() => this.logout(), this.idleDuration);
  // }

  // private setupActivityListeners() {
  //   document.addEventListener('mousemove', this.resetIdleTimer.bind(this));
  //   document.addEventListener('keypress', this.resetIdleTimer.bind(this));
  //   // Add more listeners as needed
  // }

  // private cleanupActivityListeners() {
  //   document.removeEventListener('mousemove', this.resetIdleTimer.bind(this));
  //   document.removeEventListener('keypress', this.resetIdleTimer.bind(this));
  //   // Remove other listeners if added
  // }
}
