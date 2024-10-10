import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss']
})
export class GymComponent {
  gym: any = {
    name: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    },
    contact: {
      
      email: ''
    },
    // other fields
  };
  constructor(private apiService: GymService, private router: Router) {}

  onSubmit() {
    this.apiService.addGym(this.gym).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding gym', error);
      },
    });
  }

}
