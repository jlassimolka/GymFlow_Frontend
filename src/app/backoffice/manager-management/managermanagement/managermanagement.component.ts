import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Manager } from '../../models/Manager';
import { ManagerManagementService } from '../../services/manager-management.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Reponse } from 'src/app/models/Reponse';
import { ShowmanagerComponent } from '../showmanager/showmanager.component';

@Component({
  selector: 'app-managermanagement',
  templateUrl: './managermanagement.component.html',
  styleUrls: ['./managermanagement.component.scss']
})
export class ManagermanagementComponent implements OnInit {

  @ViewChild("dt") table?: Table;

  managers: Manager[] = [];
  page: number = 0;
  size: number = 5;
  first: number = 0;
  totalRecords: number = 0;
  searchName: string = ''; 

  constructor(
    private managerManagementService: ManagerManagementService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllManagers();
  }

  searchManagers() {
    this.page = 0; // Reset to the first page on search
    this.getAllManagers();
  }

  getAllManagers() {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || ''
    };

    this.managerManagementService.getAllManager(params).subscribe({
      next: (response: Reponse<Manager[]>) => {
        this.managers = response?.content;
        this.totalRecords = response?.total;
        this.size = response?.size;
        this.page = response?.page;
        if (this.totalRecords === 0) {
          this.toastr.success('Managers List', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error retrieving managers', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving managers', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  paginate(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;
    this.getAllManagers();
  }

  deleteManager(manager: Manager) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + manager.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteManagerService(manager._id);
      }
    });
  }

  deleteManagerService(id: string): void {
    this.managerManagementService.deleteManagerById(id).subscribe({
      next: (response: Reponse<any>) => {
        this.toastr.success('Manager deleted successfully', '', {
          toastClass: 'toast-center-top toast-success-custom'
        });
        this.getAllManagers();
      },
      error: (error) => {
        this.toastr.error('Error deleting manager', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error deleting manager', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  showManagerDetails(manager: Manager): void {
    this.dialog.open(ShowmanagerComponent, {
      data: { id: manager._id }, // Pass the manager ID as data
    });
  }
  navigateToAddEditManager(managerId?: string): void {
    if (managerId) {
      this.router.navigate(['/back-office/edit-manager', managerId]);
    } else {
      this.router.navigate(['/back-office/add-manager']);
    }
  }
}

