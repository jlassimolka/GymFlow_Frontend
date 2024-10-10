import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { GymComponent } from './gym/gym.component';

export const PagesRoutes: Routes = [
  {
    path: 'test1',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'add-edit-gym',
    component: GymComponent,
    data: {
      title: 'Add Gym',
    },
  },
];
