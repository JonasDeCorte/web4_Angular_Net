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
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = undefined;
              } else {           
                this.notificationService.success(':: logged in succesfully'); 
                this.router.navigateByUrl('/personeel/list');
              }
            } else {
              
            }
        this.errorString = this.authService.errorString;
        });
  }
}