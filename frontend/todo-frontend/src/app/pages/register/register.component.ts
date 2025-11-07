import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [   CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb=inject(FormBuilder);
  private authService=inject(AuthService);
  private router=inject(Router);
  private snackBar=inject(MatSnackBar);


  isLoading=false;
  
  registerForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });

  async onSubmit():Promise<void>{
    if(this.registerForm.valid){
      this.isLoading=true;

      try{
        const userDta=this.registerForm.value as {
          username:string,
          email:string,
          password:string
        };
        await this.authService.register(userDta).toPromise();

        this.snackBar.open('Compte créé avec succès!','Fermer',{duration:3000});

        this.router.navigate(['/login']);
      }
      catch(error:any){
        console.error('Registration error:',error);
        this.snackBar.open(
          error.error?.message||'Erreur lors de la création du compte',
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
