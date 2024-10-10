import { Component, Inject, Input, OnInit } from '@angular/core';
import { Reponse } from 'src/app/models/Reponse';
import { Coach } from '../../models/Coach';
import { Adherent } from '../../models/Adherent';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdherentManagementService } from '../../services/adherent-management.service';
import { Gym } from '../../models/Gym';

@Component({
  selector: 'app-show-adherent',
  templateUrl: './show-adherent.component.html',
  styleUrls: ['./show-adherent.component.scss']
})
export class ShowAdherentComponent implements OnInit {
  
  adherent: Adherent = {} as Adherent;
  gym: Gym | null = null;
  coach: Coach | null = null;

  constructor(
    private adherentService: AdherentManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<ShowAdherentComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.getAdherentDetails(this.data.id);
    }
  }

  getAdherentDetails(id: string): void {
    this.adherentService.getAdherentById(id).subscribe({
      next: (response: Reponse<Adherent>) => {
        if (response.content) {
          this.adherent = response.content;
          this.loadAdditionalDetails();
        } else {
          console.error('No content found for adherent ID:', id);
        }
      },
      error: (error) => {
        console.error('Error fetching adherent details:', error);
      }
    });
  }

  loadAdditionalDetails(): void {
    if (this.adherent.gym) {
      this.adherentService.getGymById(this.adherent.gym).subscribe({
        next: (response: Reponse<Gym>) => {
          if (response.content) {
            this.gym = response.content;
          }
        },
        error: (error) => {
          console.error('Error fetching gym details:', error);
        }
      });
    }

    if (this.adherent.coach) {
      this.adherentService.getCoachById(this.adherent.coach).subscribe({
        next: (response: Reponse<Coach>) => {
          if (response.content) {
            this.coach = response.content;
          }
        },
        error: (error) => {
          console.error('Error fetching coach details:', error);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}