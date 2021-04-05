import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersoneelComponent } from './personeel/personeel.component';
import { MaterialModule } from 'app/material/material.module';

import { PersoneelLijstComponent } from './personeel-lijst/personeel-lijst.component';
import { AddPersoneelComponent } from './add-personeel/add-personeel.component';
import { PersoneelFilterPipe } from './personeel-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PersoneelComponent, PersoneelLijstComponent, AddPersoneelComponent, PersoneelFilterPipe],
  imports: [
    CommonModule, MaterialModule, HttpClientModule, ReactiveFormsModule
  ],
  exports: [PersoneelLijstComponent]
})
export class PersoneelModule { }
