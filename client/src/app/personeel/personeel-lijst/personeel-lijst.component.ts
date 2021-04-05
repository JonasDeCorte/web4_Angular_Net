import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PersoneelDataService } from '../personeel-data.service';
import { PERSONEEL } from '../personeel/mock-personeel';

import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-lijst',
  templateUrl: './personeel-lijst.component.html',
  styleUrls: ['./personeel-lijst.component.css']
})
export class PersoneelLijstComponent implements OnInit {
 
  constructor(private _personeelDataService: PersoneelDataService) { }
 get personeel() {
   return this._personeelDataService.personeel;
 }
 
  ngOnInit(): void {
    
  }
  addNewPersoneel(personeel: Personeel) {
    this._personeelDataService.addNewPersoneel(personeel);
  }
}
