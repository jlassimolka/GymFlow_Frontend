import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ShowgyofficeComponent } from './showgyoffice/showgyoffice.component';
import { DetailofficegymComponent } from './detailofficegym/detailofficegym.component';
import { HomeComponent } from './home/home.component';
import { CoachComponent } from './coach/coach.component';


const routes: Routes = [
  {
    path: 'gym-list',
    component: ShowgyofficeComponent,
    data: {
      title: 'Gym list',
    },
  },
  {
    path: 'homepage',
    component: HomeComponent,
    data: {
      title: 'home page',
    },
  },
  {
    path: 'coach',
    component: CoachComponent,
    data: {
      title: 'coach page',
    },
  },
  {
    path: 'gym-detail/:id',
    component: DetailofficegymComponent,
    data: {
      title: 'Gym detail',
    },
  }


 
 
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }