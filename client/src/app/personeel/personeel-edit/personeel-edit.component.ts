import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  personeelFG : FormGroup
  constructor(private route: ActivatedRoute, private personeelDataService: PersoneelDataService, private fb: FormBuilder,) { }

  ngOnInit(): void {
  /*  this.route.paramMap.subscribe(pa =>
      this.personeelDataService.getPersoneel$(pa.get('id'))
        .subscribe(item => this.personeel = item)
    );
    */
    this.personeelFG = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      functie: ['', [Validators.required]],
      geboorteDatum: ['', [Validators.required]],
      datumInDienst: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      telefoonNummer: ['', [Validators.required]],
      adres: this.fb.group({
        postcode: [''],
        straat: [''],
        huisnummer: [''],
        land: ['']
      }),
    });
    this.route.data.subscribe(item => 
      this.personeel = item['personeel']);
      
  }
  onEdit(){
    
    
    return false;
  }

}