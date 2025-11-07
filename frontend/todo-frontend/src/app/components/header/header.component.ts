import { Component, inject,  OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserDisplayPipe } from '../../pipes/user-display.pipe';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,UserDisplayPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:true
})
export class HeaderComponent implements OnInit {
  authService=inject(AuthService);
  router=inject(Router);


  // Ajouter dans la classe:
private themeService = inject(ThemeService);
isDarkMode = false;

ngOnInit(): void {
  this.themeService.darkMode$.subscribe(isDark => {
    this.isDarkMode = isDark;
  });
}

toggleTheme(): void {
  this.themeService.toggleDarkMode();
}

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
