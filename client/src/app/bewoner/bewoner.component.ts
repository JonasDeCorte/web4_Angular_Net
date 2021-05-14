import { OnInit, ViewChild } from "@angular/core";
import { Component, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BewonerDataServiceService } from './bewoner-data-service.service';
import { BewonerFormDialogComponent } from "./bewoner-form-dialog/bewoner-form-dialog.component";
import { Bewoner } from './bewoner.model';
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-bewoner',
  templateUrl: './bewoner.component.html',
  styleUrls: ['./bewoner.component.css']
})
export class BewonerComponent implements OnInit {
 //'personeel'
 @Output() newItemEvent = new EventEmitter<Bewoner>();
displayedColumns: string[] = ['name','geboorteDatum','eetOpKamer','wordtGehaald', 'actions'];
dataSource : any;
bewoners : Bewoner[] = [];
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private bewonerService : BewonerDataServiceService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  this.getBewoners();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }
  public getBewoners(){
    this.bewonerService.bewoners$.subscribe((data) => this.dataSource.data = data);
    console.log(this.dataSource);
  }
  onRowClicked(row: Bewoner) {
    console.log('Row clicked: ', row);
    this.bewoners.push(row);
    this.addNewBewoner(row);
}
addNewBewoner(value: Bewoner) {
  if(this.bewoners.includes(value)){
    this.newItemEvent.emit(value);
  }
  
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}
delete(row : Bewoner) {
  console.log(row.id)
  const dialogRef = this.dialog.open(ConfirmationDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.bewonerService.deleteBewoner(row.id);
    }
  });
}

edit(row : Bewoner){
  const dialogRef = this.dialog.open(BewonerFormDialogComponent, {
    width: '720px',
    data: row
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.bewonerService.edit(result);
    }
  });
}
}