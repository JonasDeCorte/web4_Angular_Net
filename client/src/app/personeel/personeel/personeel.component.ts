import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Personeel } from './personeel.model';

@Component({
  selector: 'app-personeel',
  templateUrl: './personeel.component.html',
  styleUrls: ['./personeel.component.css']
})
export class PersoneelComponent implements OnInit {
  @Input() public personeel: Personeel;

  title = 'Personeels register';

  constructor() {}

  ngOnInit(): void {
  }
 
}
