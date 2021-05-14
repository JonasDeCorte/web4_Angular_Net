import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { filter } from 'lodash';
import { pipe } from 'rxjs';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import {Bewoner} from './bewoner.model'
@Injectable({
  providedIn: 'root'
})

export class BewonerDataServiceService {
  dataChange: BehaviorSubject<Bewoner[]> = new BehaviorSubject<Bewoner[]>([]);
  dialogData: any;
  private _bewoners$ = new BehaviorSubject<Bewoner[]>([]);
  private _bewoners: Bewoner[];
  constructor(private http: HttpClient){
    this.bewoners$
      .pipe(
        catchError((err) => {
          // temporary fix, while we use the behaviorsubject as a cache stream
          this._bewoners$.error(err);
          return throwError(err);
        })
      )
      .subscribe((bewoners: Bewoner[]) => {
        this._bewoners = bewoners;
        this._bewoners$.next(this._bewoners);
      });
  }
  get data(): Bewoner[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  getAllBewoners(): void {
    this.http.get<Bewoner[]>(`${environment.apiUrl}/Bewoner/`).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }
  get allBewoners$(): Observable<Bewoner[]> {
    return this._bewoners$;
  }
  get bewoners$(): Observable<Bewoner[]> {
    return this.http.get(`${environment.apiUrl}/Bewoner/`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Bewoner[] => list.map(Bewoner.fromJSON))
    );
  }
  getBewoner$(id: string): Observable<Bewoner> {
    return this.http
      .get(`${environment.apiUrl}/Bewoner/${id}`)
      .pipe(catchError(this.handleError), map(Bewoner.fromJSON)); // returns just one bewoner, as json
  }
  deleteBewoner(id: number) {
    return this.http
      .delete(`${environment.apiUrl}/Bewoner/${id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._bewoners = this._bewoners.filter((bew) => bew.id != id);
        this._bewoners$.next(this._bewoners);
      });
  }
  edit(bewoner: Bewoner) {
    return  this.http
    .put(`${environment.apiUrl}/Bewoner/${bewoner.id}`, bewoner.toJSON)
    .pipe(catchError(this.handleError), map(Bewoner.fromJSON))
    .pipe(
      catchError((err) => {
        return throwError(err);
      }),
      tap((pers: Bewoner) => {
        console.log(pers);
        this._bewoners = this._bewoners.filter((bew) => bew.id != bewoner.id);
        this._bewoners$.next(this._bewoners);
      })
    ); 
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