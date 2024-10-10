import { Component, Inject, OnInit } from '@angular/core';
import { Manager } from '../../models/Manager';
import { Gym } from '../../models/Gym';
import { ManagerManagementService } from '../../services/manager-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-showmanager',
  templateUrl: './showmanager.component.html',
  styleUrls: ['./showmanager.component.scss']
})
export class ShowmanagerComponent implements OnInit {
  manager: Manager = {} as Manager;
  gym: Gym | undefined;

  constructor(
    private managerService: ManagerManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, // Receive data from dialog
    private dialogRef: MatDialogRef<ShowmanagerComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.getManagerDetails(this.data.id);
    }
  }

  getManagerDetails(id: string): void {
    this.managerService.getManagerById(id).subscribe({
      next: (response: Reponse<Manager>) => {
        if (response.content) {
          this.manager = response.content;
          
          // Fetch gym details if needed
          if (this.manager.gym) {
            this.managerService.getGymById(this.manager.gym).subscribe({
              next: (gymResponse: Reponse<Gym>) => {
                if (gymResponse.content) {
                  this.gym = gymResponse.content;
                }
              },
              error: (error) => {
                console.error(`Error fetching gym details for ID ${this.manager.gym}:`, error);
              }
            });
          }
        } else {
          console.error('No content found for manager ID:', id);
        }
      },
      error: (error) => {
        console.error('Error fetching manager details:', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}