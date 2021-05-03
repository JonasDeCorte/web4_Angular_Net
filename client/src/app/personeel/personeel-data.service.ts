import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Personeel } from './personeel/personeel.model';
@Injectable({
  providedIn: 'root',
})
export class PersoneelDataService {
  
  
  private _personeel$ = new BehaviorSubject<Personeel[]>([]);
  private _personeel: Personeel[];
  constructor(private http: HttpClient) {
    this.personeel$.subscribe((pers: Personeel[]) => {
      this._personeel = pers;
      this._personeel$.next(this._personeel);
    });
  }

  get allPersoneel$(): Observable<Personeel[]> {
    return this._personeel$;
  }
  get personeel$(): Observable<Personeel[]> {
    return this.http.get(`${environment.apiUrl}/Personeel/`).pipe(
      catchError(this.handleError),
      map((list: any[]): Personeel[] => list.map(Personeel.fromJSON))
    );
  }
  getPersoneel$(id: string): Observable<Personeel> {
    return this.http
      .get(`${environment.apiUrl}/Personeel/${id}`)
      .pipe(catchError(this.handleError), map(Personeel.fromJSON)); // returns just one recipe, as json
  }
  addNewPersoneel(personeel: Personeel) {
    return this.http
      .post(`${environment.apiUrl}/Personeel/`, personeel.toJSON())
      .pipe(catchError(this.handleError), map(Personeel.fromJSON))
      .subscribe((pers: Personeel) => {
        this._personeel = [...this._personeel, pers];
        this._personeel$.next(this._personeel);
      });
 }
 public addImage(file: File, persoonId: number): Observable<string>
 {
     
     const formData = new FormData();
     formData.append('file', file, file.name);
     
     return this.http.post(`${environment.apiUrl}/Personeel/addImage/${persoonId}`, formData).pipe(
       map((a: any): string => a)
     );
 }
 public getImage(id: number): Observable<any[]>
 {
   return this.http.get(`${environment.apiUrl}/Personeel/getImage/${id}`).pipe(
     catchError(this.handleError),
     map((image: any): any[] => 
     {
         if (image)
         {
         return image.imageData;
         }
         return null;
       
     })
   )
 }
 editPersoneel(personeel: Personeel){
   return this.http.put(`${environment.apiUrl}/Personeel/${personeel.id}`, personeel.toJSON())
   .pipe(catchError(this.handleError), map(Personeel.fromJSON))
   .subscribe((pers: Personeel) => {
    this._personeel = [...this._personeel, pers];
    this.personeel$.forEach(x => x)
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
