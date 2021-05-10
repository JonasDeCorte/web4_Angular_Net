import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BewonerComponent } from './bewoner/bewoner.component';
import { BewonerModule } from './bewoner/bewoner.module';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './interceptors';
import { PersoneelModule } from './personeel/personeel.module';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainNavComponent,
    //BewonerComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    UserModule,
   // PersoneelModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BewonerModule, 
    AppRoutingModule,
   
    
    
   
  ],
  
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
