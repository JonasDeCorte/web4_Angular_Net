
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { BewonerComponent } from './bewoner/bewoner.component';
import { AlleBewonersComponent } from './bewoner/alle-bewoners/alle-bewoners.component';




@NgModule({
  declarations: [MainNavComponent, BewonerComponent, AlleBewonersComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports:[MainNavComponent, BewonerComponent]
})
export class MainpageModule { }
