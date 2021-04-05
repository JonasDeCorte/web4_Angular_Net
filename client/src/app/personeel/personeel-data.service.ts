import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Personeel } from './personeel/personeel.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneelDataService {
  constructor(private http: HttpClient) {}
    
  
  get personeel$(): Observable<Personeel[]> {
    return this.http
    .get(`${environment.apiUrl}/Personeel/`)
    .pipe(
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON)));
      }
  addNewPersoneel(personeel: Personeel) {
    //this._personeel = [...this._personeel, personeel];
    //this._personeel.push(personeel);
    throw 'not imp yet';
  }
}
