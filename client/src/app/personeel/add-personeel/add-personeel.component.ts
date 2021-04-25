import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personeel } from '../personeel/personeel.model';
import {NotificationServiceService} from '../../notification-service.service';
import { PersoneelDataService } from '../personeel-data.service';

@Component({
  selector: 'app-add-personeel',
  templateUrl: './add-personeel.component.html',
  styleUrls: ['./add-personeel.component.css']
})
export class AddPersoneelComponent implements OnInit {
  @Output() public newPersoneel = new EventEmitter<Personeel>();
  personeelFG : FormGroup
  constructor(private _personeelDataService: PersoneelDataService, private fb: FormBuilder,     private notificationService: NotificationServiceService) { }

  ngOnInit(): void {
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
  
  }

  onSubmit(){
    const personeel = new Personeel(10,this.personeelFG.value.name, this.personeelFG.value.name,
       this.personeelFG.value.geboorteDatum, this.personeelFG.value.datumInDienst, this.personeelFG.value.email, this.personeelFG.value.telefoonNummer
    , this.personeelFG.value.adres.postcode, this.personeelFG.value.adres.straat, this.personeelFG.value.adres.huisnummer, this.personeelFG.value.adres.land);
    this.newPersoneel.emit(personeel);
    this._personeelDataService.addNewPersoneel(personeel);
    this.notificationService.success(':: Submitted succesfully'); 
    return false;
  }
  addNewPersoneel(personeel: Personeel) {
    console.log(personeel);
    this._personeelDataService
    .addNewPersoneel(personeel)
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

