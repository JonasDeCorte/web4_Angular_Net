import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Personeel } from './personeel/personeel.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersoneelDataService } from './personeel-data.service';

@Injectable({
  providedIn: 'root',
})
export class PersoneelResolver implements Resolve<Personeel> {
  constructor(private personeelService: PersoneelDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Personeel> {
    return this.personeelService.getPersoneel$(route.params['id']);
  }
}
