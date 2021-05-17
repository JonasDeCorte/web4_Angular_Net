import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationServiceService } from 'app/notification-service.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public logInForm: FormGroup;
  public errorString: string;
  public errorMessage: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,private notificationService: NotificationServiceService
  ) {}

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  /*
  onSubmit()
  {
    this.authService.login(
      this.logInForm.value.email,
      this.logInForm.value.password
      ).pipe(
        catchError(err =>
          {
            this.errorMessage = err; 
            return EMPTY;
          })
      ).subscribe(val =>
        {
          if (val) {
            this.router.navigate(['/personeel/list']);
            this.notificationService.success(':: logged in succesfully'); 
            
          } else {
            this.errorMessage = `Could not login`;
          }
  
        });
  }
  */
  onSubmit() {
    this.authService.login(
      this.logInForm.value.email,
      this.logInForm.value.password
      )
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/personeel/list']);
              this.notificationService.success(':: logged in succesfully'); 
            }
          } else {
            this.errorMessage = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.logInForm.value.username}: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} while trying to login user ${this.logInForm.value.username}: ${err.error}`;
          }
        }
      );
  }
}