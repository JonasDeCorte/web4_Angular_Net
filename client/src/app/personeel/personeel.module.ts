import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersoneelComponent } from './personeel/personeel.component';
import { MaterialModule } from 'app/material/material.module';

import { PersoneelLijstComponent } from './personeel-lijst/personeel-lijst.component';
import { AddPersoneelComponent } from './add-personeel/add-personeel.component';


@NgModule({
  declarations: [PersoneelComponent, PersoneelLijstComponent, AddPersoneelComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [PersoneelLijstComponent]
})
export class PersoneelModule { }
