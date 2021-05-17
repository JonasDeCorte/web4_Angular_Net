import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Personeel } from './personeel/personeel.model';
@Injectable({
  providedIn: 'root',
})
export class PersoneelDataService {
  private _reloadPersoneel$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}
  get personen$(): Observable<Personeel[]> {
    return this.http.get(`${environment.apiUrl}/Personeel/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON))
    );
  }
  fetchPersonen$(name?: string, functie?: string) {
    let params = new HttpParams();
    params = name ? params.append('name', name) : params;
    params = functie ? params.append('functie', functie) : params;
    return this.http.get(`${environment.apiUrl}/Personeel/`, { params }).pipe(
      catchError(this.handleError),
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON))
    );
  }
  getPersonen$(name?: string, functie?: string) {
    return this._reloadPersoneel$.pipe(
      switchMap(() => this.fetchPersonen$(name, functie))
    );
  }
   getPersoneel$(id: string): Observable<Personeel> {
    return this.http
      .get(`${environment.apiUrl}/Personeel/${id}`)
      .pipe(catchError(this.handleError), map(Personeel.fromJSON)); // returns just one personeel, as json
  }
  addNewPersoneel(personeel: Personeel) {
    return this.http
      .post(`${environment.apiUrl}/Personeel/`, personeel.toJSON())
      .pipe(catchError(this.handleError), map(Personeel.fromJSON))
      .pipe(
        catchError((err) => {
          return throwError(err);
        }),
        tap((pers: Personeel) => {
          this._reloadPersoneel$.next(true);
        })
      );
  }
  public addImage(file: File, persoonId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .post(`${environment.apiUrl}/Personeel/addImage/${persoonId}`, formData)
      .pipe(map((a: any): string => a));
  }
  public getImage(id: number): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/Personeel/getImage/${id}`).pipe(
      catchError(this.handleError),
      map((image: any): any[] => {
        if (image) {
          console.log(image);
          return image.imageData;
        }
      })
    );
  }
  deletePersoon(personeel: Personeel) {
    return this.http
      .delete(`${environment.apiUrl}/Personeel/${personeel.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._reloadPersoneel$.next(true);
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
