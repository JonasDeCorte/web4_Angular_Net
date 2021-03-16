import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bewoner',
  templateUrl: './bewoner.component.html',
  styleUrls: ['./bewoner.component.css']
})
export class BewonerComponent implements OnInit {

  id?: number;
  firstName: string;
  age: number;
  job: string;
  constructor(id: number = null, firstName: string = '', age: number = 0, job: string = '')
{
this.id = id;
this.firstName = firstName;
this.age = age;
this.job = job;
}


  ngOnInit(): void {
  }

}
