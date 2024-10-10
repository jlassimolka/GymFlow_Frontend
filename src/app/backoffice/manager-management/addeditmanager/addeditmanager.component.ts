import { Component, OnInit } from '@angular/core';
import { Manager } from '../../models/Manager';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerManagementService } from '../../services/manager-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gym } from '../../models/Gym';

@Component({
  selector: 'app-addeditmanager',
  templateUrl: './addeditmanager.component.html',
  styleUrls: ['./addeditmanager.component.scss']
})
export class AddeditmanagerComponent implements OnInit {
  managerForm: FormGroup;
  isEditMode: boolean = false;
  managerId: string = '';
  gyms: Gym[] = [];

  constructor(
    private fb: FormBuilder,
    private managerService:  ManagerManagementService ,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.managerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      CIN: ['', Validators.required],
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
    this.fetchGyms();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.managerId = id;
      this.isEditMode = true;
      this.loadManagerData();
    }
  }

  fetchGyms() {
    this.managerService.getGyms().subscribe((response) => {
      this.gyms = response.content;
    });
  }

  loadManagerData() {
    this.managerService.getManagerById(this.managerId).subscribe((response) => {
      const manager: Manager = response.content; // Adjust according to your response structure
      this.managerForm.patchValue(manager);
    });
  }

  onSubmit() {
    if (this.managerForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.managerService.updateManager(this.managerId, this.managerForm.value).subscribe(() => {
        this.router.navigate(['/back-office/manager-list']);
      });
    } else {
      this.managerService.createManager(this.managerForm.value).subscribe(() => {
        this.router.navigate(['/back-office/manager-list']);
      });
    }
  }
}