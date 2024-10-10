import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Coach } from '../../models/Coach';
import { Table } from 'primeng/table';
import { CoachManagementService } from '../../services/coach-management.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reponse } from 'src/app/models/Reponse';
import { ShowcoachComponent } from '../showcoach/showcoach.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coachmanagment',
  templateUrl: './coachmanagment.component.html',
  styleUrls: ['./coachmanagment.component.scss'],

})
export class CoachmanagmentComponent implements OnInit {

  @ViewChild("dt") table?: Table;
  @Input() gymId!: string; 

  coaches: Coach[] = [];
  page: number = 0;
  size: number = 5;
  first: number = 0;
  totalRecords: number = 0;
  searchName: string = ''; 
  displayModal: boolean = false; // Add this line
  selectedCoach: Coach | null = null;

  constructor(
    private coachManagementService: CoachManagementService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
    
  ) { }

  ngOnInit(): void {
    this.getAllCoaches();
  }
  searchCoaches() {
    this.page = 0; // Reset to the first page on search
    this.getAllCoaches();
  }

  getAllCoaches() {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || '',
      gymId : this.gymId
    };

    this.coachManagementService.getAllCoach(params).subscribe({
      next: (response: Reponse<Coach[]>) => {
        this.coaches = response?.content;
        this.totalRecords = response?.total;
        this.size = response?.size;
        this.page = response?.page;
        if (this.totalRecords === 0) {
          this.toastr.success('Coaches List', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error retrieving coaches', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving coaches', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  paginate(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;
    this.getAllCoaches();
  }

  deleteCoach(coach: Coach) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + coach.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCoachService(coach._id);
      }
    });
  }

  deleteCoachService(id: string): void {
    this.coachManagementService.deleteCoachById(id).subscribe({
      next: (response: Reponse<any>) => {
        this.toastr.success('Coach deleted successfully', '', {
          toastClass: 'toast-center-top toast-success-custom'
        });
        this.getAllCoaches();
      },
      error: (error) => {
        this.toastr.error('Error deleting coach', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error deleting coach', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }


  

  showCoachDetails(coach: Coach): void {
    this.dialog.open(ShowcoachComponent, {
      data: { id: coach._id }, // Pass the coach ID as data
      
    });
  }

  navigateToAddEditCoach(coachId?: string): void {
    if (coachId) {
      this.router.navigate(['/back-office/edit-coach', coachId]);
    } else {
      this.router.navigate(['/back-office/add-coach']);
    }
  }

  
}
