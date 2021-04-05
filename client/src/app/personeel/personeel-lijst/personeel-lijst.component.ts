import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PersoneelDataService } from '../personeel-data.service';


import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-lijst',
  templateUrl: './personeel-lijst.component.html',
  styleUrls: ['./personeel-lijst.component.css']
})
export class PersoneelLijstComponent implements OnInit {
  private _personeel: Personeel[];
  public filterPersoneelName: string;
  public filterPersoneel$ = new Subject<string>();
  private _fetchPersoneel$ = this._personeelDataService.personeel$;
  constructor(private _personeelDataService: PersoneelDataService) {
    this.filterPersoneel$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase()),
      filter(val => !val.startsWith('s'))
    ).subscribe(
      val => this.filterPersoneelName = val);
    
     
    }
   
 get personeel$(): Observable<Personeel[]> {
   return this._fetchPersoneel$;
 }
 
  ngOnInit(): void {
    
  }
  addNewPersoneel(personeel: Personeel) {
    this._personeelDataService.addNewPersoneel(personeel);
  }
  applyFilter(filter: string) {
    this.filterPersoneelName = filter;
}
}
