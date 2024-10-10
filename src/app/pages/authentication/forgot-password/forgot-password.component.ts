import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: string = '';
  message: string = '';

  constructor(private authService: AuthenticationService) {}

  submitForgotPassword() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        this.message = 'Password recovery instructions have been sent to your email.';
      },
      error => {
        this.message = 'Error: Unable to send password recovery email.';
      }
    );
  }
}