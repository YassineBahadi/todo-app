// src/app/services/config.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  private config: any = {};

  loadConfig(): Promise<void> {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      })
      .catch(() => {
        // Fallback to environment
        this.config = {
          apiUrl: 'https://todo-backend-production.up.railway.app/api'
        };
      });
  }

  get apiUrl(): string {
    return this.config.apiUrl || environment.apiUrl;
  }
}