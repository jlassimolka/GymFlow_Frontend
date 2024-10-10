import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gym } from 'src/app/backoffice/models/Gym';
import { GymManagementService } from 'src/app/backoffice/services/gym-management.service';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-showgyoffice',
  templateUrl: './showgyoffice.component.html',
  styleUrls: ['./showgyoffice.component.scss']
})
export class ShowgyofficeComponent implements OnInit {

  gyms: Gym[] = [];
  page: number = 0;
  size: number = 8;
  totalRecords: number = 0;
  searchName: string = '';   // Search by name
  searchCountry: string = ''; // Search by country

  constructor(private gymManagementService: GymManagementService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAllGyms();
  }

  getAllGyms(): void {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || '',    // Include searchName
      country: this.searchCountry || '' // Include searchCountry
    };

    this.gymManagementService.getAllGyms(params).subscribe({
      next: (response: Reponse<Gym[]>) => {
        this.gyms = response?.content;
        this.totalRecords = response?.total;
        if (this.totalRecords === 0) {
          this.toastr.success('No gyms found', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error retrieving gyms', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving gyms', error);
      }
    });
  }

  paginate(event: any): void {
    this.page = event.page;
    this.size = event.rows;
    this.getAllGyms();
  }

  searchGyms(): void {
    this.page = 0; // Reset to the first page
    this.getAllGyms();
  }

  // Navigate to the detail page
  viewGymDetails(gymId: string): void {
    this.router.navigate(['/front-office/gym-detail', gymId]);  // Navigate to the detail page with the gym ID
  }
}