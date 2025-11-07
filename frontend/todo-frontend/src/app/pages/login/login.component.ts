import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router , RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true
})
export class LoginComponent {
  private fb=inject(FormBuilder);
  private authService=inject(AuthService);
  private router=inject(Router);
  private snackBar=inject(MatSnackBar);

  isLoading=false;

  loginForm=this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required],
  });

  async onSubmit():Promise<void>{
    if(this.loginForm.valid){
      this.isLoading=true;

      try{
        const credentials=this.loginForm.value as {username: string; password:string};
        await this.authService.login(credentials).toPromise();
        this.snackBar.open('Connexion réussie!','Fermer',{duration:3000});
        this.router.navigate(['/dashboard']);
      }
      catch(error:any){
        console.error('Login error:',error);
        this.snackBar.open(
          error.error?.message || 'Erreur de connexion',
          'Fermer',
          {duration:5000}
        );
      }
      finally{
        this.isLoading=false;
      }
    }
  }

}
