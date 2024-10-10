import { Component, Inject, OnInit } from '@angular/core';
import { Coach } from '../../models/Coach';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachManagementService } from '../../services/coach-management.service';
import { Reponse } from 'src/app/models/Reponse';
import { Gym } from '../../models/Gym';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-showcoach',
  templateUrl: './showcoach.component.html',
  styleUrls: ['./showcoach.component.scss']
})
export class ShowcoachComponent implements OnInit {
  coach: Coach = {} as Coach;

  constructor(
    private coachService: CoachManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }, // Receive data from dialog
    private dialogRef: MatDialogRef<ShowcoachComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.getCoachDetails(this.data.id);
    }
  }

  getCoachDetails(id: string): void {
    this.coachService.getCoachById(id).subscribe({
      next: (response: Reponse<Coach>) => {
        if (response.content) {
          this.coach = response.content;

          if (this.coach.gyms && this.coach.gyms.length > 0) {
            const gymIds: string[] = response.content.gyms as unknown as string[];
            this.coach.gyms = [];

            gymIds.forEach(gymId => {
              this.coachService.getGymById(gymId).subscribe({
                next: (gymResponse: Reponse<Gym>) => {
                  if (gymResponse.content) {
                    this.coach.gyms?.push(gymResponse.content);
                  }
                },
                error: (error) => {
                  console.error(`Error fetching gym details for ID ${gymId}:`, error);
                }
              });
            });
          }
        } else {
          console.error('No content found for coach ID:', id);
        }
      },
      error: (error) => {
        console.error('Error fetching coach details:', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}