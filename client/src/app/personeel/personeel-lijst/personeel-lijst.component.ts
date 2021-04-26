import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AddPersoneelComponent } from '../add-personeel/add-personeel.component';
import { PersoneelDataService } from '../personeel-data.service';


import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-lijst',
  templateUrl: './personeel-lijst.component.html',
  styleUrls: ['./personeel-lijst.component.css']
})
export class PersoneelLijstComponent implements OnInit {
  public filterPersoneelName: string;
  public filterPersoneel$ = new Subject<string>();
  private _fetchPersoneel$: Observable<Personeel[]> 
  public errorMessage: string = '';
  
  constructor(private _personeelDataService: PersoneelDataService, private dialog: MatDialog) {
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
    this._fetchPersoneel$ = this._personeelDataService.allPersoneel$.pipe
    (catchError((err) =>  {
      this.errorMessage = err.message; 
      return EMPTY;
     })
    );
  }
  /*
  addNewPersoneel(personeel: Personeel) {
      console.log(personeel);
      this._personeelDataService
      .addNewPersoneel(personeel)
  }
  */
  applyFilter(filter: string) {
    this.filterPersoneelName = filter;
}
onCreate(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
this.dialog.open(AddPersoneelComponent, dialogConfig);
}

}
