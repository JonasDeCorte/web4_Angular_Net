import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BewonerDataServiceService } from './bewoner-data-service.service';
import { Bewoner } from './bewoner.model';


@Component({
  selector: 'app-bewoner',
  templateUrl: './bewoner.component.html',
  styleUrls: ['./bewoner.component.css']
})
export class BewonerComponent implements OnInit {
 
displayedColumns: string[] = ['name','geboorteDatum','eetOpKamer','wordtGehaald','personeel'];
dataSource : any;
@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private bewonerService : BewonerDataServiceService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
  this.getBewoners();
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    
   
  }
  public getBewoners(){
    this.bewonerService.bewoners$().subscribe((data) => this.dataSource.data = data);
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
}
applyFilter(filterValue: string) {

  
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}

}
