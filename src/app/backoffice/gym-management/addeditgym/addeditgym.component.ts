import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GymManagementService } from '../../services/gym-management.service';
import { Gym } from '../../models/Gym';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditgym',
  templateUrl: './addeditgym.component.html',
  styleUrls: ['./addeditgym.component.scss']
})
export class AddeditgymComponent implements OnInit {

  gymForm: FormGroup;
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  availableHours: string[] = [
    '09:00-21:00',
    '10:00-18:00',
    '08:00-20:00',
    '07:00-19:00',
    'Closed'
  ];
  isEditMode = false;
  gymId: string | null = null;
  gym?: Gym;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private gymManagementService: GymManagementService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.gymForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      this.gymId = params.get('id');
      if (this.gymId) {
        this.isEditMode = true;
        this.getGymById(this.gymId);
      }
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getGymById(id: string) {
    this.gymManagementService.getGymById(id).subscribe({
      next: (response) => {
        if (response.content) {
          this.gym = response.content;
          this.initForm();
        }
      },
      error: (error) => {
        console.error('Error fetching gym details', error);
        this.router.navigate(['/back-office/404']); // Navigate to the 404 page on error
      },
    });
  }

  initForm() {
    this.gymForm = this.fb.group({
      name: [this.gym?.name, Validators.required],
      address: this.fb.group({
        street: [this.gym?.address?.street, Validators.required],
        city: [this.gym?.address?.city, Validators.required],
        postalCode: [this.gym?.address?.postalCode, Validators.required],
        country: [this.gym?.address?.country, Validators.required], // Fixed 'street' to 'country'
      }),
      openingHours: this.fb.group({
        Monday: [this.gym?.openingHours?.Monday || '00:00-00:00'],
        Tuesday: [this.gym?.openingHours?.Tuesday || '00:00-00:00'],
        Wednesday: [this.gym?.openingHours?.Wednesday || '00:00-00:00'],
        Thursday: [this.gym?.openingHours?.Thursday || '00:00-00:00'],
        Friday: [this.gym?.openingHours?.Friday || '00:00-00:00'],
        Saturday: [this.gym?.openingHours?.Saturday || '00:00-00:00'],
        Sunday: [this.gym?.openingHours?.Sunday || '00:00-00:00'],
      }),
      memberCount: [this.gym?.memberCount, [Validators.required, Validators.min(1)]],
      services: [this.gym?.services?.join(', ') || ''],
      contact: this.fb.group({
        phone: [this.gym?.contact?.phone, Validators.required],
        email: [this.gym?.contact?.email, [Validators.required, Validators.email]],
      }),
    });
  }
  onUpload(id: string) {
    if (this.selectedFile) {
      this.gymManagementService.uploadFile(id, this.selectedFile)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/back-office/gyms-list']);
          },
          error: (err) => {
            console.error('Error uploading file:', err);
          }
        });
    } else {
      this.router.navigate(['/back-office/gyms-list']);
    }
  }

  editGym(id: string, gym: Gym) {
    this.gymManagementService.updateGym(id, gym).subscribe({
      next: (response) => {
        this.toastr.success('Gym updated successfully', '', { toastClass: 'toast-success-custom' });
        this.onUpload(id); // Call the upload method here
      },
      error: (error) => {
        this.toastr.error('Error updating gym', '', { toastClass: 'toast-error-custom' });
        console.error('Error updating gym:', error);
        this.router.navigate(['/back-office/404']);
      },
    });
  }

  saveGym(gym: Gym) {
    this.gymManagementService.createGyms(gym).subscribe({
      next: (response) => {
        this.toastr.success('Gym created successfully', '', { toastClass: 'toast-success-custom' });
        this.onUpload(response.content._id); // Call the upload method here
      },
      error: (error) => {
        this.toastr.error('Error creating gym', '', { toastClass: 'toast-error-custom' });
        console.error('Error creating gym:', error);
        this.router.navigate(['/back-office/404']);
      },
    });
  }

  onSubmit() {
    if (this.gymForm.valid) {
      const gym: Gym = this.gymForm.value;
      gym.services = this.gymForm.value.services.split(',').map((service: string) => service.trim());
      
      if (this.isEditMode && this.gymId) {
        this.editGym(this.gymId, gym);
      } else {
        this.saveGym(gym);
      }
    } else {
      this.toastr.error('Form is invalid', '', { toastClass: 'toast-error-custom' });
    }
  }
}
