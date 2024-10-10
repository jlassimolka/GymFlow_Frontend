import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gym } from '../../models/Gym';
import { AdherentManagementService } from '../../services/adherent-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Adherent } from '../../models/Adherent';
import { Coach } from '../../models/Coach';

@Component({
  selector: 'app-addedit-adherent',
  templateUrl: './addedit-adherent.component.html',
  styleUrls: ['./addedit-adherent.component.scss']
})
export class AddeditAdherentComponent implements OnInit {
  adherentForm: FormGroup;
  isEditMode: boolean = false;
  adherentId: string = '';
  gyms: Gym[] = [];
  coaches: Coach[] = [];

  constructor(
    private fb: FormBuilder,
    private adherentService: AdherentManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.adherentForm = this.fb.group({
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
      gym: [''],
      coach: ['']
    });
  }

  ngOnInit(): void {
    this.fetchGyms();
    this.fetchCoaches();  // Fetch coaches on initialization
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adherentId = id;
      this.isEditMode = true;
      this.loadAdherentData();
    }
  }

  fetchGyms() {
    this.adherentService.getGyms().subscribe((response) => {
      this.gyms = response.content;
    });
  }

  fetchCoaches() {
    this.adherentService.getCoach().subscribe((response) => {
      this.coaches = response.content;
    });
  }

  loadAdherentData() {
    this.adherentService.getAdherentById(this.adherentId).subscribe((response) => {
      const adherent: Adherent = response.content;
      this.adherentForm.patchValue(adherent);
    });
  }

  onSubmit() {
    if (this.adherentForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.adherentService.updateAdherent(this.adherentId, this.adherentForm.value).subscribe(() => {
        this.router.navigate(['/back-office/adherent-list']);
      });
    } else {
      this.adherentService.createAdherent(this.adherentForm.value).subscribe(() => {
        this.router.navigate(['/back-office/adherent-list']);
      });
    }
  }
}