import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddPersoneelComponent } from './personeel/add-personeel/add-personeel.component';
import { PersoneelLijstComponent } from './personeel/personeel-lijst/personeel-lijst.component';
import { PersoneelEditComponent } from './personeel/personeel-edit/personeel-edit.component';
import { PersoneelResolver } from './personeel/PersoneelResolver';



const appRoutes: Routes = [
  { path: 'personeel/list', component: PersoneelLijstComponent },
  { path: 'personeel/add', component: AddPersoneelComponent },
  { path: 'personeel/edit/:id', component: PersoneelEditComponent, resolve: {personeel: PersoneelResolver} },
  { path: '', redirectTo: 'personeel/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
