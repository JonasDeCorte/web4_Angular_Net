import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BewonersComponent } from './bewoners/bewoners.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import {PersoneelModule} from './personeel/personeel.module'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BewonersComponent,
    PageNotFoundComponent,
    MainNavComponent,
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    PersoneelModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
