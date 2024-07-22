import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private idleTimeout$ = new Subject<void>();
  private userActivity$ = new Subject<void>();

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.startWatching();
    }
  }

  startWatching() {
    const activity$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'click')
    );

    activity$.subscribe(() => this.userActivity$.next());

    this.userActivity$
      .pipe(
        debounceTime(30000),  // 30 seconds of inactivity
        tap(() => this.idleTimeout$.next())
      )
      .subscribe();

    this.idleTimeout$.subscribe(() => this.onTimeout());
  }

  resetTimer() {
    if (isPlatformBrowser(this.platformId)) {
      this.userActivity$.next();
    }
  }

  private onTimeout() {
    if (isPlatformBrowser(this.platformId)) {
      //alert('You have been logged out due to inactivity.');
      localStorage.removeItem('token');
      this.router.navigate(['/logout']);
    }
  }

  get idleState() {
    return this.idleTimeout$.asObservable();
  }
}
