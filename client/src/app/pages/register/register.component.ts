import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../../app/validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  //register form property 
  registerForm !: FormGroup;
  

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
  
  );
  }

  //register method
  register() {
    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert("User Created!");
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
