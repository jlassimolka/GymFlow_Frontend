import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ConfirmationService } from "primeng/api";
import { DialogModule } from "primeng/dialog";
import { SplitButtonModule } from "primeng/splitbutton";
import { MaterialModule } from "../material.module";
import { FieldsetModule } from "primeng/fieldset";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FrontofficeRoutingModule } from "./frontoffice-routing.module";
import { ShowgyofficeComponent } from './showgyoffice/showgyoffice.component';
import { CardModule } from 'primeng/card';
import { DetailofficegymComponent } from './detailofficegym/detailofficegym.component';
import { HomeComponent } from './home/home.component';
import { CoachComponent } from './coach/coach.component';
import { DetailcoachComponent } from './detailcoach/detailcoach.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
    
    ShowgyofficeComponent,
          DetailofficegymComponent,
          HomeComponent,
          CoachComponent,
          DetailcoachComponent,
          FooterComponent,
          NavbarComponent
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule, // Add ReactiveFormsModule here
      TableModule,
      ButtonModule,
      PaginatorModule,
      ConfirmDialogModule,
      FieldsetModule,
      CardModule,
      MaterialModule,
      MatFormFieldModule, // Add Angular Material Modules
      MatInputModule,
      DialogModule,
      MatCardModule,
      MatButtonModule,
      SplitButtonModule,
      FrontofficeRoutingModule
    ],
    providers: [ConfirmationService],
  })
  export class FrontofficeModule { }
  