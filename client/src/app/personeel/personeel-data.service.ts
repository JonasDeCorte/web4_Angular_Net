import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    Name: new FormControl('', Validators.required),
    Functe: new FormControl('', Validators.required),
    GeboorteDatum: new FormControl(''),
    DatumInDienst: new FormControl(''),
    Email: new FormControl('',Validators.email),
    TelefoonNr: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Postcode: new FormControl(''),
    Straat: new FormControl(''),
    Huisnummer: new FormControl(''),
    Land: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      $key:null,
      Name: '',
      Functie: '',
      GeboorteDatum: '',
      DatumInDienst: '',
      Email: '',
      TelefoonNr: '',
      Postcode: '',
      Straat: '',
      Huisnummer: '',
      Land: '',
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
  addNewPersoneel(personeel: Personeel) {
    return this.http
      .post(`${environment.apiUrl}/Personeel/`, personeel.toJSON())
      .pipe(catchError(this.handleError), map(Personeel.fromJSON))
      .subscribe((pers: Personeel) => {
        this._personeel = [...this._personeel, pers];
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
