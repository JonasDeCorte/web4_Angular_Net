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
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BewonerDataServiceService } from 'app/bewoner/bewoner-data-service.service';
import { Bewoner } from 'app/bewoner/bewoner.model';
import { MatSelect } from '@angular/material/select';
import { ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-add-personeel',
  templateUrl: './add-personeel.component.html',
  styleUrls: ['./add-personeel.component.css'],
})
export class AddPersoneelComponent implements OnInit {
  @ViewChild('mySel', { static: false }) skillSel: MatSelect;
  personeelFG: FormGroup;
  public errorMessage: string = '';
  public confirmationMessage: string = '';
  selectedBewoners: any[] = [];
  bewoners = new FormControl();
  BewonersList: Bewoner[];

  constructor(
    private _personeelDataService: PersoneelDataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationServiceService,
    private _bewonerDataService: BewonerDataServiceService
  ) {}

  ngOnInit(): void {
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
    this.getBewoners();
  }
  onOut(val, index) {
    if (index === this.BewonersList.length) {
      if (!val.source.selected && val.source.value === 'All') {
        this.skillSel.options.forEach((itemName: MatOption) => {
          itemName.selected
            ? (itemName.deselect(), this.selectedBewoners.pop())
            : this.selectedBewoners.pop();
        });
        return;
      } else {
        this.skillSel.options.forEach((itemName: MatOption, position) => {
          itemName.selected
            ? ''
            : (itemName.select(), this.push(val, index, position, itemName));
        });
      }
    } else {
      let valueOfIndex = this.selectedBewoners.findIndex(
        (Itemname) => Itemname.index === index
      );
      valueOfIndex !== -1
        ? this.selectedBewoners.splice(valueOfIndex, 1)
        : this.selectedBewoners.push({
            index: index,
            name: val.source.value,
            isSelected: true,
          });
    }
  }
  push(val, index, position, itemName: MatOption) {
    let inm = this.selectedBewoners.filter((item) => {
      return item.index === position;
    });
    inm.length
      ? ''
      : this.selectedBewoners.push({
          index: position,
          name: itemName.value,
          isSelected: true,
        });
  }
  /*
  getPersoneel(id: number){
    this._personeelDataService.getPersoneel$(id).subscribe(
      (personeel : Personeel) => {
        this.editPersoneel(personeel)
        this.editPersObj = personeel;
      }, (err: any) => console.log(err)
    );
  }

  editPersoneel(personeel : Personeel){
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
            postcode:  personeel.postcode,
            huisnummer: personeel.huisnummer,
             straat: personeel.straat,
             land: personeel.land,
          }
      
    });
    console.log(personeel.postcode);
    console.log(personeel.huisnummer);
  }
  mapFormValuesToPersoneelModel(){
  this.editPersObj.name =  this.personeelFG.value.name; 
  this.editPersObj.functie =  this.personeelFG.value.functie;
  this.editPersObj.email =  this.personeelFG.value.email;
  this.editPersObj.telefoonNummer =  this.personeelFG.value.telefoonNummer;
  this.editPersObj.geboorteDatum =  this.personeelFG.value.geboorteDatum;
  this.editPersObj.datumInDienst =  this.personeelFG.value.datumInDienst;
  this.editPersObj.postcode =  this.personeelFG.value.postcode;
  this.editPersObj.huisnummer =  this.personeelFG.value.huisnummer;
  this.editPersObj.straat =  this.personeelFG.value.straat;
  this.editPersObj.land =  this.personeelFG.value.land;
  }
  */

  public getBewoners() {
    this._bewonerDataService.bewoners$().subscribe((result) => {
      this.BewonersList = result;
    });
  //  this.selectedBewoners.push(this.BewonersList[0]);
  }
  clickedOption() {
    console.log(this.selectedBewoners);
  }
  onSubmit() {
    /* this.mapFormValuesToPersoneelModel();
    this._personeelDataService.editPersoneel(this.editPersObj).subscribe(
() =>this.router.navigate(['/personeel/list']),
(err: any) => console.log(err)
    );
    */
    const personeel = new Personeel(
      this.personeelFG.value.id,
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
      this.selectedBewoners
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
      });
    this.router.navigate(['/personeel/list']);
    return false;
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
