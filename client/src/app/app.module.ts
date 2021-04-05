import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { BewonersComponent } from './bewoners/bewoners.component';
import { PersoneelModule } from './personeel/personeel.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BewonersComponent,
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    PersoneelModule,
 
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
