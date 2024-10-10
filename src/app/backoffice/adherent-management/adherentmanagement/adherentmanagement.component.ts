import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Reponse } from 'src/app/models/Reponse';
import { Adherent } from '../../models/Adherent';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AdherentManagementService } from '../../services/adherent-management.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { ShowAdherentComponent } from '../show-adherent/show-adherent.component';

@Component({
  selector: 'app-adherentmanagement',
  templateUrl: './adherentmanagement.component.html',
  styleUrls: ['./adherentmanagement.component.scss']
})
export class AdherentmanagementComponent implements OnInit {

  @ViewChild("dt") table?: Table;
  @Input() gymId = '';

  adherents: Adherent[] = [];
  page: number = 0;
  size: number = 5;
  first: number = 0;
  totalRecords: number = 0;
  searchName: string = ''; 
  displayModal: boolean = false;
  selectedAdherent: Adherent | null = null;

  constructor(
    private adherentManagementService: AdherentManagementService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllAdherents();
  }

  searchAdherents() {
    this.page = 0; // Reset to the first page on search
    this.getAllAdherents();
  }

  getAllAdherents() {
    const params = {
      page: this.page,
      size: this.size,
      name: this.searchName || '',
      gymId : this.gymId
    };

    this.adherentManagementService.getAllAdherent(params).subscribe({
      next: (response: Reponse<Adherent[]>) => {
        this.adherents = response?.content;
        this.totalRecords = response?.total;
        this.size = response?.size;
        this.page = response?.page;
        if (this.totalRecords === 0) {
          this.toastr.success('Adherents List', '', {
            toastClass: 'toast-center-top toast-success-custom'
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error retrieving adherents', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error retrieving adherents', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  paginate(event: any) {
    this.page = event.first / event.rows;
    this.size = event.rows;
    this.getAllAdherents();
  }

  deleteAdherent(adherent: Adherent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + adherent.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAdherentService(adherent._id);
      }
    });
  }

  deleteAdherentService(id: string): void {
    this.adherentManagementService.deleteAdherentById(id).subscribe({
      next: (response: Reponse<any>) => {
        this.toastr.success('Adherent deleted successfully', '', {
          toastClass: 'toast-center-top toast-success-custom'
        });
        this.getAllAdherents();
      },
      error: (error) => {
        this.toastr.error('Error deleting adherent', '', {
          toastClass: 'toast-center-top toast-error-custom'
        });
        console.error('Error deleting adherent', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      }
    });
  }

  showAdherentDetails(adherent: Adherent): void {
    this.dialog.open(ShowAdherentComponent, {
      data: { id: adherent._id }, // Pass the adherent ID as data
    });
  }

  navigateToAddEditAdherent(adherentId?: string): void {
    if (adherentId) {
      this.router.navigate(['/back-office/edit-adherent', adherentId]);
    } else {
      this.router.navigate(['/back-office/add-adherent']);
    }
  }
}