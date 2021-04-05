import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';
import { never, Observable } from 'rxjs';
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
    .pipe(catchError(this.handleError),
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON)));
      }
  addNewPersoneel(personeel: Personeel) {
    //this._personeel = [...this._personeel, personeel];
    //this._personeel.push(personeel);
    throw 'not imp yet';
  }

handleError(err: any): Observable<never> {
  let errorMessage: string;
  if (err instanceof HttpErrorResponse) {
    errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
  } else {
    errorMessage = `an unknown error occurred ${err}`;
  }
  console.error(err);
  return throwError(errorMessage);
}
}

