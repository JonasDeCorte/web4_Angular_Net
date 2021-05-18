import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Personeel } from '../personeel/personeel.model';
import { NotificationServiceService } from '../../notification-service.service';
import { PersoneelDataService } from '../personeel-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BewonerDataServiceService } from 'app/bewoner/bewoner-data-service.service';
import { Bewoner } from 'app/bewoner/bewoner.model';

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
  submitted = false;
  bewoners: Bewoner[] = [];
  addBewoner(newItem: Bewoner) {
    if (!this.bewoners.includes(newItem)) {
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
    this.personeelFG = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      functie: ['', [Validators.required]],
      geboorteDatum: ['', [Validators.required]],
      datumInDienst: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefoonNummer: ['', [Validators.required]],
    });
  }
/*   getBewoner(id: string){
    this._bewonerDataService.getBewoner$(id).subscribe( (data) => {
      this.bewonersToAdd.push(data);
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  ); */
  createPersoon() {
    console.log(this.bewoners);
    let bewonersArray = this.bewoners.map(Bewoner.fromJSON);
    const personeel = new Personeel(
      this.personeelFG.value.name,
      this.personeelFG.value.name,
      this.personeelFG.value.geboorteDatum,
      this.personeelFG.value.datumInDienst,
      this.personeelFG.value.email,
      this.personeelFG.value.telefoonNummer,
      );
    bewonersArray.forEach(x => personeel.addBewoner(x));
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
      bewonersArray.forEach(x => {
        this._bewonerDataService.deleteBewoner(x.id);
      })
    }
  onSubmit() {
    this.submitted = true;
    if (this.personeelFG.invalid) {
      return;
    }
      this.createPersoon();  
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
