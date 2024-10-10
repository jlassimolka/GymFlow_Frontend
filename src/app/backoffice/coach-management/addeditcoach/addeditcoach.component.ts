import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoachManagementService } from '../../services/coach-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coach } from '../../models/Coach';
import { Gym } from '../../models/Gym';

@Component({
  selector: 'app-addeditcoach',
  templateUrl: './addeditcoach.component.html',
  styleUrls: ['./addeditcoach.component.scss']
})
export class AddeditcoachComponent implements OnInit {
  coachForm: FormGroup;
  isEditMode: boolean = false;
  coachId: string = '';
  gyms: Gym[] = [];
  selectedFile: File | null = null;


  trainingSpecialties = ['Yoga', 'Fitness', 'Pilates', 'CrossFit', 'Bodybuilding', 'Cardio', 'Dance', 'Martial Arts'];

  constructor(
    private fb: FormBuilder,
    private coachService: CoachManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.coachForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDeTel: ['', Validators.required],
      CIN: ['', Validators.required],
      status: ['active'],
      price: [null, Validators.required],
      trainingSpecialties: [[], Validators.required],
      gyms: [[], Validators.required] 
    });
  }

  ngOnInit(): void {
    this.fetchGyms(); 
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.coachId = id;
      this.isEditMode = true;
      this.loadCoachData();
    }
  }
  fetchGyms() {
    this.coachService.getGyms().subscribe((response) => {
      this.gyms = response.content;
    });
  }

  loadCoachData() {
    this.coachService.getCoachById(this.coachId).subscribe((response) => {
      const coach: Coach = response.content;
      this.coachForm.patchValue(coach);
    });
  }

  onSubmit() {
    if (this.coachForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.coachService.updateCoach(this.coachId, this.coachForm.value).subscribe({
        next: (res) => {
          this.onUpload(this.coachId);
        },
        error: (error) => {
          // han
        }
        });
    } else {
      this.coachService.createCoach(this.coachForm.value).subscribe({
        next: (res) => {
          this.onUpload(res.content._id);
        },
        error: (error) => {
          // han
        }
        });
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onUpload(id:string) {
    if (this.selectedFile) {
      this.coachService.uploadFile(id,this.selectedFile)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/back-office/coaches-list']);
          },
          error: (err) => {
            // 
          }
        });
    } else{
      this.router.navigate(['/back-office/coaches-list']);
    }
  }

}