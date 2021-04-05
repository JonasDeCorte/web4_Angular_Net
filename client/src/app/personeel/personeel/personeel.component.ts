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
  gridColumns = 3;
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  constructor() {}

  ngOnInit(): void {
  }
 
}
