import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './user/auth.guard';
const appRoutes: Routes = [
  {
    path: 'personeel',
    canActivate: [AuthGuard],
    loadChildren: () => import('./personeel/personeel.module').then(mod => mod.PersoneelModule),
    data: { preload: true },
  },
  {
    path: 'bewoner',
    canActivate: [ AuthGuard ],
    loadChildren:() => import('./bewoner/bewoner.module').then(mod => mod.BewonerModule),
    data: { preload: true },
  },
  { path: '', redirectTo: 'personeel/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }