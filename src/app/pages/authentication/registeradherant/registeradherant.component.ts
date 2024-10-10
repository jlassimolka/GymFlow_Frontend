import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coach } from 'src/app/backoffice/models/Coach';
import { Gym } from 'src/app/backoffice/models/Gym';
import { AdherentManagementService } from 'src/app/backoffice/services/adherent-management.service';

@Component({
  selector: 'app-registeradherant',
  templateUrl: './registeradherant.component.html',
  styleUrls: ['./registeradherant.component.scss']
})

export class RegisteradherantComponent implements OnInit {
  registerAdherentForm: FormGroup;
  gyms: Gym[] = [];
  coaches: Coach[] = [];
  selectedFile: File | null = null; // For file upload

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adherentService: AdherentManagementService // Service to fetch gyms and coaches
  ) {
    this.registerAdherentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      CIN: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      gym: [''],
      coach: ['']
    });
  }

  ngOnInit(): void {
    this.fetchGyms();
    this.fetchCoaches();
  }

  fetchGyms(): void {
    this.adherentService.getGyms().subscribe(response => {
      this.gyms = response.content;
    });
  }

  fetchCoaches(): void {
    this.adherentService.getCoach().subscribe(response => {
      this.coaches = response.content;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file
    }
  }

  onSubmit(): void {
    if (this.registerAdherentForm.valid) {
      const adherentData = this.registerAdherentForm.value;
      this.adherentService.createAdherent(adherentData).subscribe(
        (response) => {
          console.log('Adherent registered successfully', response);
          const adherentId = response.content._id; // Get the adherent ID from the response
          if (this.selectedFile) {
            this.adherentService.uploadFile(adherentId, this.selectedFile).subscribe(
              (uploadResponse) => {
                console.log('Profile picture uploaded successfully', uploadResponse);
                this.router.navigate(['/dashboard']); // Redirect after successful upload
              },
              (uploadError) => {
                console.error('Failed to upload profile picture', uploadError);
              }
            );
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          console.error('Failed to register adherent', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
