import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AddPersoneelComponent } from '../add-personeel/add-personeel.component';
import { PersoneelDataService } from '../personeel-data.service';


import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-lijst',
  templateUrl: './personeel-lijst.component.html',
  styleUrls: ['./personeel-lijst.component.css']
})
export class PersoneelLijstComponent implements OnInit {
  public filterPersoneelName: string = '';
  //public personen: Personeel[];
  public filterPersoneel$ = new Subject<string>();
  private _fetchPersoneel$: Observable<Personeel[]> 
  public errorMessage: string = '';
  
  constructor(private _personeelDataService: PersoneelDataService, private dialog: MatDialog, private _router: Router,
    private _route: ActivatedRoute) {
      
      this.filterPersoneel$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(val => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/personeel/list'], params);
      });

     this._fetchPersoneel$ = this._route.queryParams.pipe(
        switchMap(params => {
          if (params['filter']) {
            this.filterPersoneelName = params['filter'];
          }
            return this._personeelDataService.getPersonen$(params['filter']);
          })
        ).pipe(
            catchError((err) => {
              this.errorMessage = err;
              return EMPTY;
            })
          )    
      };
    
   
 get personen$(): Observable<Personeel[]> {
   return this._fetchPersoneel$;
 }
 
  ngOnInit(): void {  }
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
