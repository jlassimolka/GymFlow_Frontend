import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gym } from 'src/app/backoffice/models/Gym';
import { ManagerManagementService } from 'src/app/backoffice/services/manager-management.service';
import { Reponse } from 'src/app/models/Reponse';

@Component({
  selector: 'app-registermanager',
  templateUrl: './registermanager.component.html',
  styleUrls: ['./registermanager.component.scss']
})
export class RegistermanagerComponent implements OnInit {
  registerManagerForm: FormGroup;
  gyms: Gym[] = []; // Initialize gyms property
  selectedFile: File | null = null; // Add this line to handle file selection

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerManagementService,
    private router: Router
  ) {
    this.registerManagerForm = this.fb.group({
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
      gym: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGyms(); // Fetch gyms data on initialization
  }

  loadGyms(): void {
    this.managerService.getGyms().subscribe(
      (response: Reponse<Gym[]>) => {
        this.gyms = response.content; // Adjust according to your actual API response structure
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
    if (this.registerManagerForm.valid) {
      const managerData = this.registerManagerForm.value;
      this.managerService.createManager(managerData).subscribe(
        (response) => {
          console.log('Manager registered successfully', response);
          const managerId = response.content._id; // Get the manager ID from the response
          if (this.selectedFile) {
            this.managerService.uploadFile(managerId, this.selectedFile).subscribe(
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
          console.error('Failed to register manager', error); // Log error if registration fails
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
