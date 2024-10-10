import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistercoachComponent } from './registercoach/registercoach.component';
import { MenuComponent } from './menu/menu.component';
import { RegisteradherantComponent } from './registeradherant/registeradherant.component';
import { RegistermanagerComponent } from './registermanager/registermanager.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'registeradh',
        component: RegisteradherantComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'registermanag',
        component: RegistermanagerComponent,
      },
      {
        path: 'registercoach',
        component: RegistercoachComponent ,
      },
      {
        path: 'password',
        component: ForgotPasswordComponent,
      },
    ],
  },
];
