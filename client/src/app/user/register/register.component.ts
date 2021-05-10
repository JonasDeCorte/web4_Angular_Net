import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationServiceService } from 'app/notification-service.service';
import { EMPTY } from 'rxjs';

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public errorMessage: string = '';
  public registerForm: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationServiceService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability),
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, { hasNumber: true }),
              patternValidator(/[A-Z]/, { hasUpperCase: true }),
              patternValidator(/[a-z]/, { hasLowerCase: true }),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        { validator: comparePasswords }
      ),
    });
  }

 

  onSubmit() {
    this.authService
      .register(
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.email,
        this.registerForm.value.passwordGroup.password
      ).pipe(
        catchError(err =>
          {
            
            this.errorMessage = err;
            return EMPTY;
          }))
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.notificationService.success(':: registered succesfully'); 
              this.router.navigate(['/personeel/list']);
              
            }
          } else {
            this.notificationService.warn(':: something went wrong.'); 
            this.errorMessage = `Could not register`;
            
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.registerForm.value.email}: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} while trying to login user ${this.registerForm.value.email}: ${err.error}`;
          }
        }
      );
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} characters (got ${errors.minlength.actualLength})`;
    } else if (errors.hasNumber) {
      return `needs at least 1 number`;
    } else if (errors.hasUpperCase) {
      return `needs at least 1 upper case letter`;
    } else if (errors.hasNumber) {
      return `needs at least 1 lower case letter`;
    } else if (errors.userAlreadyExists) {
      return `user already exists`;
    } else if (errors.email) {
      return `not a valid email address`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
    }
  }
}