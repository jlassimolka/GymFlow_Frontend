import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gym } from 'src/app/backoffice/models/Gym';
import { CoachManagementService } from 'src/app/backoffice/services/coach-management.service';

@Component({
  selector: 'app-registercoach',
  templateUrl: './registercoach.component.html',
  styleUrls: ['./registercoach.component.scss']
})
export class RegistercoachComponent implements OnInit {
  registerCoachForm: FormGroup;
  trainingSpecialties = ['Yoga', 'Fitness', 'Pilates', 'CrossFit', 'Bodybuilding', 'Cardio', 'Dance', 'Martial Arts'];
  gyms: Gym[] = [];
  selectedFile: File | null = null; // For storing the selected file

  constructor(
    private fb: FormBuilder,
    private coachService: CoachManagementService,
    private router: Router
  ) {
    this.registerCoachForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDeTel: ['', Validators.required],
      CIN: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      status: ['active'],
      price: [null, Validators.required],
      trainingSpecialties: [[], Validators.required],
      gyms: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchGyms(); // Fetch gyms when the component is initialized
  }

  fetchGyms(): void {
    this.coachService.getGyms().subscribe(
      (response) => {
        this.gyms = response.content; // Access the content property of the response
      },
      (error) => {
        console.error('Failed to load gyms', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file
    }
  }

  onSubmit(): void {
    if (this.registerCoachForm.valid) {
      const coachData = this.registerCoachForm.value;
      this.coachService.createCoach(coachData).subscribe(
        (response) => {
          console.log('Coach registered successfully', response);
          const coachId = response.content._id; // Get the coach ID from the response
          if (this.selectedFile) {
            this.coachService.uploadFile(coachId, this.selectedFile).subscribe(
              (uploadResponse) => {
                console.log('Profile picture uploaded successfully', uploadResponse);
                this.router.navigate(['/dashboard']);
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
          console.error('Failed to register coach', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
