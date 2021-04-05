import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject, throwError } from 'rxjs';
import {  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Personeel } from './personeel/personeel.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneelDataService {
  private _personeel$ = new Subject<Personeel[]>();
  private _personeel: Personeel[];
  constructor(private http: HttpClient) {
    this.personeel$.subscribe((pers: Personeel[]) => {
      this._personeel = pers;
      this._personeel$.next(this._personeel);
    })
  }
    
  get allPersoneel$(): Observable<Personeel[]> {
    return this._personeel$;
  }
  get personeel$(): Observable<Personeel[]> {
    return this.http
    .get(`${environment.apiUrl}/Personeel/`)
    .pipe(catchError(this.handleError),
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON)));
      }

  addNewPersoneel(personeel: Personeel)  {
   return this.http.post(`${environment.apiUrl}/Personeel/`, personeel.toJSON())
   .pipe(catchError(this.handleError),map(Personeel.fromJSON)).subscribe((pers : Personeel) => {
     this._personeel = [...this._personeel,pers];
     this._personeel$.next(this._personeel);
   });
   
    
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

