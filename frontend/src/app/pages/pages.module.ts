import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {PagesRoutingModule} from "./pages-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { UsersListComponent } from './components/users-list/users-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DxDataGridModule} from "devextreme-angular";
import {MatTableModule} from '@angular/material/table';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    LoginComponent,
    UsersListComponent,
    UserDetailsComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    DxDataGridModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  providers:[
    HttpClient,
    AuthService,
    MatDialog,
    {provide: MatDialogRef, useValue:{}}
  ],
  entryComponents:[
    UserDetailsComponent
  ]
})
export class PagesModule { }
