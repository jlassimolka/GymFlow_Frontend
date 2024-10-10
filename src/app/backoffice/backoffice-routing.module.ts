import { RouterModule, Routes } from '@angular/router';
import { GymManagementComponent } from './gym-management/gym-management.component';
import { ShowgymComponent } from './gym-management/showgym/showgym.component';
import { NgModule } from '@angular/core';
import { AddeditgymComponent } from './gym-management/addeditgym/addeditgym.component';
import { NotFoundComponent } from './gym-management/not-found/not-found.component';
import { AddeditcoachComponent } from './coach-management/addeditcoach/addeditcoach.component';
import { CoachmanagmentComponent } from './coach-management/coachmanagment/coachmanagment.component';
import { ShowcoachComponent } from './coach-management/showcoach/showcoach.component';
import { ManagermanagementComponent } from './manager-management/managermanagement/managermanagement.component';
import { AddeditmanagerComponent } from './manager-management/addeditmanager/addeditmanager.component';
import { ShowmanagerComponent } from './manager-management/showmanager/showmanager.component';
import { AdherentmanagementComponent } from './adherent-management/adherentmanagement/adherentmanagement.component';
import { ShowAdherentComponent } from './adherent-management/show-adherent/show-adherent.component';
import { AddeditAdherentComponent } from './adherent-management/addedit-adherent/addedit-adherent.component';
import { AuthGuard } from '../services/auth.guard';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ResponsablemanagementComponent } from './responsable-management/responsablemanagement/responsablemanagement.component';
import { AddeditresponsableComponent } from './responsable-management/addeditresponsable/addeditresponsable.component';
import { ShowresponsableComponent } from './responsable-management/showresponsable/showresponsable.component';

const routes: Routes = [
  {
    path: 'gyms-list',
    // canActivate: [AuthGuard],
    component: GymManagementComponent,
    data: {
      title: 'Gym Management',
      // roles: ['ROLE_MANAGER','ROLE_COACHE','ROLE_ADHERENT'] 
    },
  },
  {
    path: 'manager-list',
    component: ManagermanagementComponent,
    data: {
      title: 'Manager Management',
    },
  },
  {
    path: 'res-list',
    component:ResponsablemanagementComponent,
    data: {
      title: 'Responsable Management',
    },
  },
  {
    path: 'coaches-list',
    component: CoachmanagmentComponent,
    data: {
      title: 'Coach Management',
    },
  },

  {
    path: 'adherent-list',
    component: AdherentmanagementComponent,
    data: {
      title: 'Adherent Management',
    },
  },
  {
    path: 'statistique',
    component: StatistiqueComponent,
    data: {
      title: 'statistic',
    },
  },
  {
    path: 'gym/:id',
    component: ShowgymComponent,
    data: {
      title: 'Gym Details',
    },
  },

  {
    path: 'coach/:id',
    component: ShowcoachComponent,
    data: {
      title: 'Coach Details',
    },
  },

  {
    path: 'manager/:id',
    component: ShowmanagerComponent,
    data: {
      title: 'Manager Details',
    },
  },
  {
    path: 'adherent/:id',
    component: ShowAdherentComponent,
    data: {
      title: 'Adherent Details',
    },
  },
  {
    path: 'responsable/:id',
    component: ShowresponsableComponent,
    data: {
      title: 'Responsable Details',
    },
  },
  {
    path: 'add-gym', // Add this route
    component: AddeditgymComponent,
    data: {
      title: 'Add/Edit Gym',
    },
  },
  {
    path: 'add-responsable', // Add this route
    component: AddeditresponsableComponent,
    data: {
      title: 'Add/Edit Responsable',
    },
  },

  {
    path: 'add-coach', // Add this route
    component: AddeditcoachComponent,
    data: {
      title: 'Add/Edit Coach',
    },
  },

  {
    path: 'add-manager', // Add this route
    component: AddeditmanagerComponent,
    data: {
      title: 'Add/Edit Manager',
    },
  },

  {
    path: 'add-adherent', // Add this route
    component: AddeditAdherentComponent,
    data: {
      title: 'Add/Edit Adherent',
    },
  },


  {
    path: 'edit-gym/:id',
    component: AddeditgymComponent,
    data: {
      title: 'Edit Gym',
    },
  },

  {
    path: 'edit-coach/:id',
    component: AddeditcoachComponent,
    data: {
      title: 'Edit Coach',
    },
  },
  {
    path: 'edit-responsable/:id',
    component: AddeditresponsableComponent,
    data: {
      title: 'edit-responsable',
    },
  },

  {
    path: 'edit-manager/:id',
    component: AddeditmanagerComponent,
    data: {
      title: 'Edit Manager',
    },
  },

  {
    path: 'edit-adherent/:id',
    component: AddeditAdherentComponent,
    data: {
      title: 'Edit Adherent',
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Page Not Found',
    },
  },
  {
    path: '**',
    redirectTo: 'statistique',  // Wildcard route for a 404 page
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }