import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BewonerDataServiceService } from '../bewoner-data-service.service';
import { Bewoner } from '../bewoner.model';

@Component({
  selector: 'app-bewoner-form-dialog',
  templateUrl: './bewoner-form-dialog.component.html',
  styleUrls: ['./bewoner-form-dialog.component.css']
})
export class BewonerFormDialogComponent implements OnInit {
  formInstance: FormGroup;


  constructor(private route: ActivatedRoute,public dialogRef: MatDialogRef<BewonerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: BewonerDataServiceService) { }
  
    formControl = new FormControl('', [
      Validators.required
    ]);
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
   onNoClick(): void {
    this.dialogRef.close();
  }
 
  stopEdit(): void {
     this.dataService.edit(this.data).subscribe(() => console.log(this.data));
  }

  submit() {
    // emppty stuff
  }

  ngOnInit(): void {
  }

}
