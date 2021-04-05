import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PersoneelComponent } from './personeel/personeel.component';
import { BewonersComponent } from './bewoners/bewoners.component';
import { PersoneelLijstComponent } from './personeel/personeel-lijst/personeel-lijst.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PersoneelComponent,
    BewonersComponent,
    PersoneelLijstComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
 
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
