import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Personeel } from '../personeel/personeel.model';

@Component({
  selector: 'app-add-personeel',
  templateUrl: './add-personeel.component.html',
  styleUrls: ['./add-personeel.component.css']
})
export class AddPersoneelComponent implements OnInit {
  @Output() public newPersoneel = new EventEmitter<Personeel>();
  personeelFG : FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personeelFG = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      adres: this.fb.group({
        postcode: [''],
        straat: [''],
        huisnummer: [''],
        land: ['']
      }),
    });
  
  }
 
  onSubmit(){

    const personeel = new Personeel(10,this.personeelFG.value.name, this.personeelFG.value.name, new Date(), new Date(), "test@hogent.be", "0478194517"
    , this.personeelFG.value.adres.postcode, this.personeelFG.value.adres.straat, this.personeelFG.value.adres.huisnummer, this.personeelFG.value.adres.land);
    this.newPersoneel.emit(personeel);
    return false;
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
