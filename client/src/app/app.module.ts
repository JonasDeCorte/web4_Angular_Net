import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainpageModule } from './mainpage/mainpage.module';
import { MaterialModule } from './material/material.module';
import {ConfirmationDialogComponent} from './mainpage/bewoner/confirmation-dialog/confirmation-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainpageModule,
    MaterialModule,
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
