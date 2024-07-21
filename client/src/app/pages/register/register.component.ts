import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../../app/validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterHeaderComponent } from "../../components/register-header/register-header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterHeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Ensure 'styleUrls' is plural
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validators: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

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
    });
  }
}