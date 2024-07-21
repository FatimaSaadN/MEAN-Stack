// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../components/popup/popup.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PopupComponent, HeaderComponent] // Add PopupComponent here
  // Add PopupComponent here
})
export class LoginComponent implements OnInit {
  
  loginForm !: FormGroup;
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
login() {
    console.log("Login button clicked");  // Debug statement
    if (this.loginForm.invalid) {
      console.log("Form is invalid");  // Debug statement
      return;
    }
    console.log("Form is valid, calling loginService");  // Debug statement

    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        console.log("Login successful", res);  // Debug statement
        localStorage.setItem('token', res.token);
        console.log("ID: ", res.data.userId)
        localStorage.setItem('userId', res.data.userId);  // Store user ID in local storage

        this.popupMessage = 'Login Successful!';
        this.showPopup = true;
        console.log("Popup should be shown");  // Debug statement

        setTimeout(() => {
          this.showPopup = false;
          console.log("Navigating to home");  // Debug statement
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
        console.log("Login error:", err);  // Debug statement
      }
    });
  }
}