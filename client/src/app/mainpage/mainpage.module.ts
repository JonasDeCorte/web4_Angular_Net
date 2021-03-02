
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MainNavComponent } from '../main-nav/main-nav.component';




@NgModule({
  declarations: [MainNavComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports:[MainNavComponent]
})
export class MainpageModule { }
