import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  UserList: string[] = [];

  constructor(private authService: AuthService) {}

  patternValidator(): ValidatorFn | null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    // @ts-ignore Not all code paths return a value
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  emailValidator = (emailControl: AbstractControl) => {
    console.log('hit');
    return this.authService.findEmail(emailControl.value).pipe(
      debounceTime(1000),
      take(1),
      map((res) =>
        res.message === 'Found' ? { emailNotAvailable: true } : null
      )
    );
  };

  userNameValidator = (userControl: AbstractControl) => {
    this.authService.findUsernames().subscribe((usernamesObj) => {
      this.UserList = usernamesObj.usernames;
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };

  validateUserName(userName: string) {
    return this.UserList.indexOf(userName) > -1;
  }

  // userValidator = (
  //   control: AbstractControl
  // ):
  //   | Promise<{ [key: string]: any }>
  //   | Observable<{ [key: string]: any } | null> => {
  //     if (typeof control.value === 'string') {
  //       return of(null);
  //     }

  //     const username = control.value as File;
  //     if (!username) return of(null);

  //     this.userService.getUser(val).pipe(
  //       debounceTime(1000),
  //       take(1),
  //       map((res) => {
  //         console.log(res.message);
  //         if (res.message === 'User found') {
  //           this.partners.push(res.user.username);
  //           event.chipInput?.clear();
  //         }
  //       })
  //     );

  // return of(null);
  //   }
}
