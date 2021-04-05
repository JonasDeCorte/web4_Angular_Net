import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-add-personeel',
  templateUrl: './add-personeel.component.html',
  styleUrls: ['./add-personeel.component.css']
})
export class AddPersoneelComponent implements OnInit {
  @Output() public newPersoneel = new EventEmitter<Personeel>();
  constructor() { }

  ngOnInit(): void {
  }
  addPersoneel(personeelName: HTMLInputElement): boolean {
    const personeel = new Personeel(10,personeelName.value,personeelName.value, new Date(), new Date());
    this.newPersoneel.emit(personeel);
    return false;
  }
}
