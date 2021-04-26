import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersoneelDataService } from '../personeel-data.service';
import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-personeel-edit',
  templateUrl: './personeel-edit.component.html',
  styleUrls: ['./personeel-edit.component.css']
})
export class PersoneelEditComponent implements OnInit {
  public personeel : Personeel;
  constructor(private route: ActivatedRoute, private personeelDataService: PersoneelDataService) { }

  ngOnInit(): void {
  /*  this.route.paramMap.subscribe(pa =>
      this.personeelDataService.getPersoneel$(pa.get('id'))
        .subscribe(item => this.personeel = item)
    );
    */
    this.route.data.subscribe(item => 
      this.personeel = item['personeel']);
  }

}
