import { Component, OnInit } from '@angular/core';
import { GymService } from '../../../services/gym.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AppSideLoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    if(isAuthenticated){
      const role = this.authService.getUserRole()
      if( role == 'ROLE_ADMIN'){
        this.router.navigate(['/dashboard']);
      }else {
        this.router.navigate(['front-office','homepage']);
      }
    } 
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          // Save the token in local storage
          this.authService.saveToken(response.token);
          this.authService.saveUser(response.user);

          // Navigate to a secure page (e.g., dashboard)
          const role = response.role ;
          if( role == 'ROLE_ADMIN'){
            this.router.navigate(['back-office']);
          }else {
            this.router.navigate(['front-office','homepage']);
          }
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid login credentials. Please try again.';
      }
    });
  }
}
