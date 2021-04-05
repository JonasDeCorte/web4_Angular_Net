import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PERSONEEL } from '../personeel/mock-personeel';

import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-lijst',
  templateUrl: './personeel-lijst.component.html',
  styleUrls: ['./personeel-lijst.component.css']
})
export class PersoneelLijstComponent implements OnInit {
 private _personeel = PERSONEEL;
  constructor() { }
 get personeel() {
   return this._personeel;
 }
 
  ngOnInit(): void {
    
  }
  addNewPersoneel(personeel: Personeel) {
    this._personeel.push(personeel);
  }
}
