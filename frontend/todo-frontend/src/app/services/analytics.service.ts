import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private router = inject(Router);

  initialize(): void {
    this.setupRouteTracking();
  }

  private setupRouteTracking(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: event.urlAfterRedirects
        });
      });
  }

  trackEvent(eventName: string, params: any): void {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }
}