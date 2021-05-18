import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BewonerComponent } from './bewoner.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'app/material/material.module';
import { BewonerResolverService } from './bewoner-resolver.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BewonerFormDialogComponent } from './bewoner-form-dialog/bewoner-form-dialog.component';

const Routes = [
  {
    path: 'bewoner/list',
    component: BewonerComponent,
  }
];

@NgModule({
  declarations: [ConfirmationDialogComponent, BewonerFormDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(Routes),
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [HttpClientModule],
})
export class BewonerModule {}
