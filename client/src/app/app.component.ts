import { Component, OnDestroy, OnInit, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { IdleService } from './idle.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  private idleService = inject(IdleService);
  private idleSubscription?: Subscription;
  private authService = inject(AuthService);
  private router = inject(Router);
  @Inject(PLATFORM_ID) private platformId: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.idleSubscription = this.idleService.idleState.subscribe(() => {
        this.authService.logoutService();
        this.router.navigate(['/login']);
      });

      this.resetIdleTimerOnUserActions();
    }
  }

  ngOnDestroy(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  resetIdleTimerOnUserActions() {
    if (isPlatformBrowser(this.platformId)) {
      ['mousemove', 'keydown', 'click'].forEach(event => {
        document.addEventListener(event, () => this.idleService.resetTimer());
      });
    }
  }
}
