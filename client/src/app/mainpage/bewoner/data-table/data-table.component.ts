import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PersonFormDialogComponent }  from '../person-form-dialog/person-form-dialog.component'; 
import { BewonerService } from '../bewoner.service';
import { Bewoner } from '../bewoner';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['firstName', 'age', 'job'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Bewoner>;
  private serviceSubscribe: Subscription;
  constructor(private bewonerService: BewonerService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Bewoner>();
  }   
 
  edit(data: Bewoner) {
    const dialogRef = this.dialog.open(PersonFormDialogComponent, {
      width: '400px',
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bewonerService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bewonerService.remove(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.bewonerService.getAll();
    this.serviceSubscribe = this.bewonerService.bewoners$.subscribe(res => {
      this.dataSource.data = res;
    })
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
  private filter() {

    this.dataSource.filterPredicate = (data: Bewoner, filter: string) => {
  
      let find = true;
  
      for (var columnName in this.columnsFilters) {
  
        let currentData = "" + data[columnName];
  
        //if there is no filter, jump to next loop, otherwise do the filter.
        if (!this.columnsFilters[columnName]) {
          return;
        }
  
        let searchValue = this.columnsFilters[columnName]["contains"];
  
        if (!!searchValue && currentData.indexOf("" + searchValue) < 0) {
  
          find = false;
          //exit loop
          return;
        }
  
        searchValue = this.columnsFilters[columnName]["equals"];
  
        if (!!searchValue && currentData != searchValue) {
          find = false;
          //exit loop
          return;
        }
  
        searchValue = this.columnsFilters[columnName]["greaterThan"];
  
        if (!!searchValue && currentData <= searchValue) {
          find = false;
          //exit loop
          return;
        }
  
        searchValue = this.columnsFilters[columnName]["lessThan"];
  
        if (!!searchValue && currentData >= searchValue) {
          find = false;
          //exit loop
          return;
        }
  
        searchValue = this.columnsFilters[columnName]["startWith"];
  
        if (!!searchValue && !currentData.startsWith("" + searchValue)) {
          find = false;
          //exit loop
          return;
        }
  
        searchValue = this.columnsFilters[columnName]["endWith"];
  
        if (!!searchValue && !currentData.endsWith("" + searchValue)) {
          find = false;
          //exit loop
          return;
        }
      }
      return find;
  
    };
  
    this.dataSource.filter = null;
    this.dataSource.filter = 'activate';
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  /**
  
   * Create a filter for the column name and operate the filter action.
  
   */
  
  applyFilter(columnName: string, operationType: string, searchValue: string) {
  
    this.columnsFilters[columnName] = {};
    this.columnsFilters[columnName][operationType] = searchValue;
    this.filter();
  }
  
  /**
  
   * clear all associated filters for column name.
  
   */
  
  clearFilter(columnName: string) {
    if (this.columnsFilters[columnName]) {
      delete this.columnsFilters[columnName];
      this.filter();
    }
  }
}
