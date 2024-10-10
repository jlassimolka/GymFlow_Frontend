import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatTableModule } from '@angular/material/table'; 

import { AuthenticationRoutes } from './authentication.routing';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistercoachComponent } from './registercoach/registercoach.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './menu/menu.component';
import { RegisteradherantComponent } from './registeradherant/registeradherant.component';
import { RegistermanagerComponent } from './registermanager/registermanager.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FileUploadModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppSideLoginComponent,
    AppSideRegisterComponent,
    ForgotPasswordComponent,
    RegistercoachComponent,
    MenuComponent,
    RegisteradherantComponent,
    RegistermanagerComponent,
    AccessDeniedComponent,
  ],
})
export class AuthenticationModule {}
