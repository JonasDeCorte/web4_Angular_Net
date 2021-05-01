import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BewonerComponent } from './bewoner.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'app/material/material.module';
import { BewonerResolverService } from './bewoner-resolver.service';

const Routes = [
  {
    path: 'bewoner/list', 
    component: BewonerComponent
  },
  {
    path: 'bewoner/list/:id', 
    component: BewonerComponent, resolve: {bewoner: BewonerResolverService}
  },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild(Routes)
  ],
  providers: [HttpClientModule]
})
export class BewonerModule { }
