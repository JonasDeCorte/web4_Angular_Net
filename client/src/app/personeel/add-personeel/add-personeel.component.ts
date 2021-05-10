import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Personeel } from '../personeel/personeel.model';
import { NotificationServiceService } from '../../notification-service.service';
import { PersoneelDataService } from '../personeel-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BewonerDataServiceService } from 'app/bewoner/bewoner-data-service.service';
import { Bewoner } from 'app/bewoner/bewoner.model';
import { MatSelect } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { reduce } from 'lodash';
import { Input } from '@angular/core';
import { BewonerComponent } from 'app/bewoner/bewoner.component';

@Component({
  selector: 'app-add-personeel',
  templateUrl: './add-personeel.component.html',
  styleUrls: ['./add-personeel.component.css'],
})
export class AddPersoneelComponent implements OnInit {
  public persoonOnEdit: Personeel = null;
  personeelFG: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';
  private id: string;
  isAddMode: boolean;
  submitted = false;
  bewoners : Bewoner[] = [];

  addBewoner(newItem: Bewoner) {
   if(!this.bewoners.includes(newItem)){
      this.bewoners.push(newItem);
   } 
   
  }
  constructor(
    private _personeelDataService: PersoneelDataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationServiceService,
    private _bewonerDataService: BewonerDataServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;
    
    this.personeelFG = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      functie: ['', [Validators.required]],
      geboorteDatum: ['', [Validators.required]],
      datumInDienst: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefoonNummer: ['', [Validators.required]],
      adres: this.fb.group({
        postcode: [''],
        straat: [''],
        huisnummer: [''],
        land: [''],
      }),
    });
    if (this.id != null) {
      this.getPersoon(this.id);
    }
  }
  getPersoon(id: string) {
    this._personeelDataService.getPersoneel$(id).subscribe(
      (data) => {
        this.persoonOnEdit = data;
        this.fillEditForm(this.persoonOnEdit);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
 
  }

  fillEditForm(personeel: Personeel) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(personeel.geboorteDatum, p);
    let dtr2 = dp.transform(personeel.datumInDienst, p);
    this.personeelFG.patchValue({
      name: personeel.name,
      functie: personeel.functie,
      email: personeel.email,
      telefoonNummer: personeel.telefoonNummer,
      geboorteDatum: dtr,
      datumInDienst: dtr2,
      adres: {
        postcode: personeel.postcode,
        huisnummer: personeel.huisnummer,
        straat: personeel.straat,
        land: personeel.land,
      },
    });
    console.log(personeel.postcode);
    console.log(personeel.huisnummer);
  }
  mapFormValuesToPersoneelModel() {
    this.persoonOnEdit.name = this.personeelFG.value.name;
    this.persoonOnEdit.functie = this.personeelFG.value.functie;
    this.persoonOnEdit.email = this.personeelFG.value.email;
    this.persoonOnEdit.telefoonNummer = this.personeelFG.value.telefoonNummer;
    this.persoonOnEdit.geboorteDatum = this.personeelFG.value.geboorteDatum;
    this.persoonOnEdit.datumInDienst = this.personeelFG.value.datumInDienst;
    this.persoonOnEdit.postcode = this.personeelFG.value.postcode;
    this.persoonOnEdit.huisnummer = this.personeelFG.value.huisnummer;
    this.persoonOnEdit.straat = this.personeelFG.value.straat;
    this.persoonOnEdit.land = this.personeelFG.value.land;
  }


  createPersoon() {
    console.log(this.bewoners);
    const personeel = new Personeel(
      this.personeelFG.value.name,
      this.personeelFG.value.name,
      this.personeelFG.value.geboorteDatum,
      this.personeelFG.value.datumInDienst,
      this.personeelFG.value.email,
      this.personeelFG.value.telefoonNummer,
      this.personeelFG.value.adres.postcode,
      this.personeelFG.value.adres.straat,
      this.personeelFG.value.adres.huisnummer,
      this.personeelFG.value.adres.land,
      this.bewoners
    );
    this._personeelDataService
      .addNewPersoneel(personeel)
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
  
          return EMPTY;
        })
      )
      .subscribe((persoon: Personeel) => {
        this.notificationService.success(
          `::  ${persoon.name} was succesfully added`
        );
        this.router.navigate(['/personeel/list']);
      });
  }
  /* editPersoon() {
    if (this.persoonOnEdit != null) {
      this.mapFormValuesToPersoneelModel();
      console.log(this.persoonOnEdit);
      this._personeelDataService.editPersoneel(this.persoonOnEdit).subscribe(
        () => this.router.navigate(['/personeel/list']),
        (err: any) =>{
          console.log(err);
    
        } 
      );
    }
  } */ 
  onSubmit() {
    this.submitted = true;
    if (this.personeelFG.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createPersoon();
    } /* else {
      this.editPersoon();
    } */
  }
  addNewPersoneel(personeel: Personeel) {
    console.log(personeel);
    this._personeelDataService.addNewPersoneel(personeel);
  }
  getErrorMessage(errors: any): string {
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} 
        characters (got ${errors.minlength.actualLength})`;
    }
  }
}
