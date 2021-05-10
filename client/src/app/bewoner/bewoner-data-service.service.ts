import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { filter } from 'lodash';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Bewoner} from './bewoner.model'
@Injectable({
  providedIn: 'root'
})

export class BewonerDataServiceService {
  private _bewoners$ = new BehaviorSubject<Bewoner[]>([]);
  private _bewoner: Bewoner[];
  constructor(private http: HttpClient){}
  get allBewoners$(): Observable<Bewoner[]> {
    return this._bewoners$;
  }
  bewoners$(): Observable<Bewoner[]> {
    return this.http.get(`${environment.apiUrl}/Bewoner/`
    ).pipe(
      catchError(this.handleError),
      map((list: any[]): Bewoner[] => list.map(Bewoner.fromJSON))
    );
  }
  getBewoner$(id: string): Observable<Bewoner> {
    return this.http
      .get(`${environment.apiUrl}/Bewoner/${id}`)
      .pipe(catchError(this.handleError), map(Bewoner.fromJSON)); // returns just one bewoner, as json
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