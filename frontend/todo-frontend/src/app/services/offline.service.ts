// src/app/services/offline.service.ts
import { Injectable, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.setupUpdates();
  }

  private setupUpdates(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
          this.promptUser();
        }
      });
    }
  }

  private promptUser(): void {
    const snackBarRef = this.snackBar.open(
      'Nouvelle version disponible!',
      'Mettre à jour',
      { duration: 10000 }
    );

    snackBarRef.onAction().subscribe(() => {
      document.location.reload();
    });
  }

  isOnline(): boolean {
    return navigator.onLine;
  }
}