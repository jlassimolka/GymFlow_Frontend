import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsablemanagementService } from '../../services/responsablemanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsable } from '../../models/Responsable';

@Component({
  selector: 'app-addeditresponsable',
  templateUrl: './addeditresponsable.component.html',
  styleUrls: ['./addeditresponsable.component.scss']
})
export class AddeditresponsableComponent implements OnInit {
  responsableForm: FormGroup;
  isEditMode: boolean = false;
  responsableId: string = '';

  constructor(
    private fb: FormBuilder,
    private responsableService: ResponsablemanagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.responsableForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      CIN: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.responsableId = id;
      this.isEditMode = true;
      this.loadResponsableData();
    }
  }

  loadResponsableData() {
    this.responsableService.getResponsableById(this.responsableId).subscribe((response) => {
      const responsable: Responsable = response.content;
      this.responsableForm.patchValue(responsable);
    });
  }

  onSubmit() {
    if (this.responsableForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.responsableService.updateResponsable(this.responsableId, this.responsableForm.value).subscribe(() => {
        this.router.navigate(['/back-office/res-list']);
      });
    } else {
      this.responsableService.createResponsable(this.responsableForm.value).subscribe(() => {
        this.router.navigate(['/back-office/res-list']);
      });
    }
  }
}