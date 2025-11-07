import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserDisplayPipe } from '../../pipes/user-display.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,UserDisplayPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true
})
export class HeaderComponent {
  authService=inject(AuthService);
  router=inject(Router);

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
