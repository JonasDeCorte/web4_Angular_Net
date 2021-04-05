import { Component, OnInit } from '@angular/core';
import { PERSONEEL } from '../mock-personeel';

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
    console.log(this.personeel);
  }

}
