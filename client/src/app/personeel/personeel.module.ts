import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersoneelComponent } from './personeel/personeel.component';
import { MaterialModule } from 'app/material/material.module';
import { PersoneelLijstComponent } from './personeel-lijst/personeel-lijst.component';
import { AddPersoneelComponent } from './add-personeel/add-personeel.component';
import { PersoneelFilterPipe } from './personeel-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PersoneelDataService } from './personeel-data.service';
import { PersoneelEditComponent } from './personeel-edit/personeel-edit.component';


@NgModule({
  declarations: [PersoneelComponent, PersoneelLijstComponent, AddPersoneelComponent, PersoneelFilterPipe, PersoneelEditComponent],
  imports: [
    CommonModule, MaterialModule, HttpClientModule, ReactiveFormsModule
  ],
  exports: [PersoneelLijstComponent],
  entryComponents: [AddPersoneelComponent],
  providers: [PersoneelDataService]
})
export class PersoneelModule { }
