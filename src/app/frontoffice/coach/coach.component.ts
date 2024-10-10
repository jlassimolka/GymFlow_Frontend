import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShowcoachComponent } from 'src/app/backoffice/coach-management/showcoach/showcoach.component';
import { Coach } from 'src/app/backoffice/models/Coach';
import { CoachManagementService } from 'src/app/backoffice/services/coach-management.service';
import { Reponse } from 'src/app/models/Reponse';
import { DetailcoachComponent } from '../detailcoach/detailcoach.component';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  @Input() gymId!: string; // Pass the gym ID as input

  coaches: Coach[] = [];
  page: number = 0;
  size: number = 8;
  totalRecords: number = 0;
  searchName: string = ''; // Add this line

  constructor(
    private coachManagementService: CoachManagementService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCoaches();
  }

  searchCoaches() {
    this.page = 0;
    this.getAllCoaches(); // Fetch coaches based on searchName
  }

  getAllCoaches() {
    const params = {
      page: this.page,
      size: this.size,
      
      gymId: this.gymId,
      name: this.searchName // Include search term
    };

    this.coachManagementService.getAllCoach(params).subscribe({
      next: (response: Reponse<Coach[]>) => {
        this.coaches = response?.content;

        this.totalRecords = response?.total;
        if (this.totalRecords === 0) {
          this.toastr.success('No coaches found', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      
      },
      error: (error) => {
        this.toastr.error('Error retrieving coaches', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving coaches', error);
      }
    });
  }
  paginate(event: any): void {
    this.page = event.page;
    this.size = event.rows;
    this.getAllCoaches();
  }

  showCoachDetails(coach: Coach): void {
    this.dialog.open(DetailcoachComponent, {
      data: { id: coach._id }, // Pass the coach ID as data
    });
  }
}