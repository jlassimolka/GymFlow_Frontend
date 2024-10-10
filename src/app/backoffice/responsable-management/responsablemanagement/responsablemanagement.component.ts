import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Responsable } from '../../models/Responsable';
import { ResponsablemanagementService } from '../../services/responsablemanagement.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-responsablemanagement',
  templateUrl: './responsablemanagement.component.html',
  styleUrls: ['./responsablemanagement.component.scss']
})
export class ResponsablemanagementComponent implements OnInit {

  @ViewChild("dt") table?: Table;

  responsables: Responsable[] = [];
  page: number = 0;
  size: number = 5;
  first: number = 0;
  totalRecords: number = 0;
  searchName: string = ''; 

  constructor(
    private responsableManagementService: ResponsablemanagementService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllResponsables();
  }

  searchResponsables() {
    this.page = 0; // Reset to the first page on search
    this.getAllResponsables();
  }

  getAllResponsables() {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || ''
    };

    this.responsableManagementService.getAllResponsable(params).subscribe({
      next: (response: Reponse<Responsable[]>) => {
        console.log('API Response:', response); // Log the full API response
        if (response.content && Array.isArray(response.content)) {
          this.responsables = response.content;
        } else {
          this.responsables = []; // Default to an empty array if content is not as expected
        }
        this.totalRecords = response.total || 0;
        this.size = response.size || 5;
        this.page = response.page || 0;
        console.log('Updated Responsable List:', this.responsables); // Log updated list
      },
      error: (error) => {
        this.toastr.error('Error retrieving responsables', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving responsables', error);
        this.router.navigate(['/back-office/404']);
      }
    });
  }

  paginate(event: any) {
    this.page = Math.floor(event.first / event.rows); // Ensure page is an integer
    this.size = event.rows;
    console.log('Pagination Event:', event); // Log pagination event for debugging
    this.getAllResponsables();
  }

  deleteResponsable(responsable: Responsable) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + responsable.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteResponsableService(responsable._id);
      }
    });
  }

  deleteResponsableService(id: string): void {
    this.responsableManagementService.deleteResponsableById(id).subscribe({
      next: (response: Reponse<any>) => {
        this.toastr.success('Responsable deleted successfully', '', {
          toastClass: 'toast-center-top toast-success-custom'
        });
        this.getAllResponsables();
      },
      error: (error) => {
        this.toastr.error('Error deleting responsable', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error deleting responsable', error);
        this.router.navigate(['/back-office/404']);
      }
    });
  }

  navigateToAddEditResponsable(responsableId?: string): void {
    if (responsableId) {
      this.router.navigate(['/back-office/edit-responsable', responsableId]);
    } else {
      this.router.navigate(['/back-office/add-responsable']);
    }
  }
}