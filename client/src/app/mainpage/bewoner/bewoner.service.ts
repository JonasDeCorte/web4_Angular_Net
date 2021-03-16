import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BewonerData } from '../bewoner/bewoner.spec';
import { Bewoner } from '../bewoner/bewoner';
@Injectable({
  providedIn: 'root'
})
export class BewonerService {
  bewoners$: BehaviorSubject<Bewoner[]>;
  bewoners: Array<Bewoner> = [];
  constructor() { 
    this.bewoners$ = new BehaviorSubject([]);
    this.bewoners = BewonerData;
  }
  getAll() {
    this.bewoners$.next(this.bewoners);
  }

  add(bewoner: Bewoner) {
    this.bewoners.push(bewoner);
  }

  edit(bewoner: Bewoner) {
    let findElem = this.bewoners.find(p => p.id == bewoner.id);
    findElem.firstName = bewoner.firstName;
    findElem.age = bewoner.age;
    findElem.job = bewoner.job;
    this.bewoners$.next(this.bewoners);
  }

  remove(id: number) {
   
    this.bewoners = this.bewoners.filter(p => {
      return p.id != id
    });

    this.bewoners$.next(this.bewoners);
  }
}
