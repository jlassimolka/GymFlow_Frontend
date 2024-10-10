import { Component, OnInit, ViewChild } from '@angular/core';
import { GymManagementService } from '../services/gym-management.service';
import { Gym } from '../models/Gym';
import { Reponse } from 'src/app/models/Reponse';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api'; 

@Component({
  selector: 'app-gym-management',
  templateUrl: './gym-management.component.html',
  styleUrls: ['./gym-management.component.scss']
})
export class GymManagementComponent implements OnInit {

  @ViewChild("dt") table?: Table;

  gyms: Gym[] = [];
  page: number = 0;
  size: number = 5;
  first: number = 0;
  totalRecords: number = 0;
  searchName: string = '';  // Add this line
  searchCountry: string = '';  // Add this line

  constructor(private gymManagementService: GymManagementService,private confirmationService: ConfirmationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllGym();
  }

  getAllGym() {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || '',
      country: this.searchCountry || ''
    };

    this.gymManagementService.getAllGyms(params).subscribe({
      next: (response: Reponse<Gym[]>) => {
        this.gyms = response?.content;
        this.totalRecords = response?.total;
        this.size = response?.size;
        this.page = response?.page;
        if (this.totalRecords === 0) {
          this.toastr.success('Gyms List', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error retrieving gyms', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving gyms', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  
  paginate(event:any){
    this.page = event.first / event.rows  ;
    this.size = event.rows  ;
    this.getAllGym();
  }
  deleteGym(gym: Gym) {
    console.log("Gtm",gym)
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + gym.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteGymService(gym._id);
        }
  });
  }

  deleteGymService(id: string): void {
    this.gymManagementService.deleteGymById(id).subscribe({
      next: (response: Reponse<any>) => {
        this.toastr.success('Gym deleted successfully', '', {
          toastClass: 'toast-center-top toast-success-custom'
        });
        this.getAllGym();
      },
      error: (error) => {
        this.toastr.error('Error deleting gym', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error deleting gym', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  showGymDetails(gym: Gym): void {
    this.router.navigate(['/back-office/gym', gym._id]);
  }
  searchGyms() {
    this.page = 0; // Reset to the first page
    this.getAllGym();
  }

  navigateToAddEditGym(gymId?: string): void {
    if (gymId) {
      this.router.navigate(['/back-office/edit-gym', gymId]);
    } else {
      this.router.navigate(['/back-office/add-gym']);
    }
  }
  

  actions(gym: Gym): MenuItem[] {
    return [
      {
        label: 'View Details',
        icon: 'pi pi-info-circle',
        command: () => this.showGymDetails(gym)
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.navigateToAddEditGym(gym._id)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteGym(gym)
      }
    ];
  }

} 