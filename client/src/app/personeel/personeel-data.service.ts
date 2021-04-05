import { Injectable } from '@angular/core';
import { PERSONEEL } from './personeel/mock-personeel';
import { Personeel } from './personeel/personeel.model';

@Injectable({
  providedIn: 'root'
})
export class PersoneelDataService {
  private _personeel = PERSONEEL;
  constructor() { }
  get personeel(): Personeel[] {
    return this._personeel;
  }

  addNewPersoneel(personeel: Personeel) {
    this._personeel.push(personeel);
  }
}
