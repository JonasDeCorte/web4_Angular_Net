import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BewonerDataServiceService } from './bewoner-data-service.service';
import { Bewoner } from './bewoner.model';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BewonerResolverService implements Resolve<Bewoner> {

  constructor(private coursesService:BewonerDataServiceService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bewoner> {
      return this.coursesService.getBewoner$(route.params['id']);
  }
}
