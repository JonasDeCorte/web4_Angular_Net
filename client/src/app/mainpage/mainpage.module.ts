
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { BewonerComponent } from './bewoner/bewoner.component';
import { DataTableComponent } from './bewoner/data-table/data-table.component';
import { ConfirmationDialogComponent } from './bewoner/confirmation-dialog/confirmation-dialog.component';
import { PersonFormDialogComponent } from './bewoner/person-form-dialog/person-form-dialog.component';





@NgModule({
  declarations: [MainNavComponent, DataTableComponent, ConfirmationDialogComponent, PersonFormDialogComponent],
  imports: [
    CommonModule, MaterialModule, DataTableComponent, ConfirmationDialogComponent
  ],
  exports:[MainNavComponent, ConfirmationDialogComponent, DataTableComponent],
  entryComponents: [ConfirmationDialogComponent],
})
export class MainpageModule { }
