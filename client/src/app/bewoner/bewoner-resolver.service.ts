import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BewonerDataServiceService } from './bewoner-data-service.service';
import { Bewoner } from './bewoner.model';

@Injectable({
  providedIn: 'root',
})
export class BewonerResolverService implements Resolve<Bewoner> {
  constructor(private coursesService: BewonerDataServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Bewoner> {
    return this.coursesService.getBewoner$(route.params['id']);
  }
}
