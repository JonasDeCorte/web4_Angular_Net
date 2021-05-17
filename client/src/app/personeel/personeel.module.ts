import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersoneelComponent } from './personeel/personeel.component';
import { PersoneelLijstComponent } from './personeel-lijst/personeel-lijst.component';
import { AddPersoneelComponent } from './add-personeel/add-personeel.component';
import { PersoneelFilterPipe } from './personeel-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PersoneelResolver } from './PersoneelResolver';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/material/material.module';
import { BewonerComponent } from 'app/bewoner/bewoner.component';

const routes: Routes = [
  { path: 'list', component: PersoneelLijstComponent },
  { path: 'add', component: AddPersoneelComponent },
];

@NgModule({
  declarations: [
    PersoneelComponent,
    PersoneelLijstComponent,
    AddPersoneelComponent,
    PersoneelFilterPipe,
    BewonerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [PersoneelLijstComponent, AddPersoneelComponent],
})
export class PersoneelModule {}
