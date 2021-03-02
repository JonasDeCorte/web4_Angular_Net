
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MainNavComponent } from '../main-nav/main-nav.component';
import { BewonerComponent } from './bewoner/bewoner.component';




@NgModule({
  declarations: [MainNavComponent, BewonerComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports:[MainNavComponent, BewonerComponent]
})
export class MainpageModule { }
