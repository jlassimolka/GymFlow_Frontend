import { Component, Inject, OnInit } from '@angular/core';
import { Responsable } from '../../models/Responsable';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponsablemanagementService } from '../../services/responsablemanagement.service';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-showresponsable',
  templateUrl: './showresponsable.component.html',
  styleUrls: ['./showresponsable.component.scss']
})
export class ShowresponsableComponent implements OnInit {

  responsable: Responsable | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private responsableManagementService: ResponsablemanagementService,
    private dialogRef: MatDialogRef<ShowresponsableComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.id) {
      this.getResponsableDetails(this.data.id);
    }
  }

  getResponsableDetails(id: string): void {
    this.responsableManagementService.getResponsableById(id).subscribe({
      next: (response: Reponse<Responsable>) => {
        if (response.content) {
          this.responsable = response.content;
        } else {
          console.error('No content found for responsable ID:', id);
        }
      },
      error: (error) => {
        console.error('Error fetching responsable details:', error);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
