import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymManagementComponent } from './gym-management/gym-management.component';
import { RouterModule } from '@angular/router';


import { TableModule } from 'primeng/table'; // Import TableModule
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { ShowgymComponent } from './gym-management/showgym/showgym.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AddeditgymComponent } from './gym-management/addeditgym/addeditgym.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material.module';
import { NotFoundComponent } from './gym-management/not-found/not-found.component';
import { AddeditcoachComponent } from './coach-management/addeditcoach/addeditcoach.component';

import { CoachmanagmentComponent } from './coach-management/coachmanagment/coachmanagment.component';
import { ShowcoachComponent } from './coach-management/showcoach/showcoach.component';
import { DialogModule } from 'primeng/dialog';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ManagermanagementComponent } from './manager-management/managermanagement/managermanagement.component';
import { AddeditmanagerComponent } from './manager-management/addeditmanager/addeditmanager.component';
import { ShowmanagerComponent } from './manager-management/showmanager/showmanager.component';
import { AdherentmanagementComponent } from './adherent-management/adherentmanagement/adherentmanagement.component';
import { AddeditAdherentComponent } from './adherent-management/addedit-adherent/addedit-adherent.component';
import { ShowAdherentComponent } from './adherent-management/show-adherent/show-adherent.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ResponsablemanagementComponent } from './responsable-management/responsablemanagement/responsablemanagement.component';
import { ShowresponsableComponent } from './responsable-management/showresponsable/showresponsable.component';
import { AddeditresponsableComponent } from './responsable-management/addeditresponsable/addeditresponsable.component';




@NgModule({
  declarations: [
    GymManagementComponent,
    ShowgymComponent,
    AddeditgymComponent,
    NotFoundComponent,
    AddeditcoachComponent,

    CoachmanagmentComponent,
      ShowcoachComponent,
      ManagermanagementComponent,
      AddeditmanagerComponent,
      ShowmanagerComponent,
      AdherentmanagementComponent,
      AddeditAdherentComponent,
      ShowAdherentComponent,
      StatistiqueComponent,
      ResponsablemanagementComponent,
      ShowresponsableComponent,
      AddeditresponsableComponent,
     
      

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    TableModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    FieldsetModule,
    MaterialModule,
    MatFormFieldModule, // Add Angular Material Modules
    MatInputModule,
    DialogModule,
    MatCardModule,
    MatButtonModule,
    SplitButtonModule,
    ButtonModule,  // Add ButtonModule here
    ConfirmDialogModule,  // Add ConfirmDialogModule here
    DialogModule, // Add Dia
    BackofficeRoutingModule
  ],
  providers: [ConfirmationService],
})
export class BackofficeModule { }
