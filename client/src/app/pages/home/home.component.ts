import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeHeaderComponent } from "../../components/home-header/home-header.component";
import { AuthService } from '../../services/auth.service'; // Make sure you have AuthService implemented to handle API calls
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeaderComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  changePassword() {
    console.log("Inside changing password");
    if (this.changePasswordForm.valid) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }
      console.log(userId);
      const passwordData = {
        currentPassword: this.changePasswordForm.value.currentPassword,
        newPassword: this.changePasswordForm.value.newPassword,
        userId: userId  // Add user ID to passwordData
      };

      this.authService.changePasswordService(userId, this.changePasswordForm.value).subscribe(
        response => {
          console.log('Password changed successfully', response);
          this.router.navigate(['/login']); 
        },
        error => {
          console.error('Error changing password', error);
        }
      );
    }
}

}
