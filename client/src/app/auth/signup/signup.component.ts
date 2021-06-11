import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/_models/auth.model';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomValidatorService } from 'src/app/_services/custom-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  form!: FormGroup;
  submitted = false;
  hide = true;
  private authStatusSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidatorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // TODO convert to new FormGroup
    this.form = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.email],
          this.customValidator.emailValidator.bind(this.customValidator),
        ],
        username: [
          '',
          [Validators.required],
          this.customValidator.userNameValidator.bind(this.customValidator),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  get registerFormControl() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  onSignup() {
    console.log('sign');
    console.log(this.form.value.username);
    console.log(`${this.form.value.username}`.toLowerCase());

    if (this.form.invalid) return;

    this.isLoading = true;
    const authData: Auth = {
      username: `${this.form.value.username}`.toLowerCase(),
      email: `${this.form.value.email}`.toLowerCase(),
      password: this.form.value.password,
    };
    console.log(authData);

    this.authService.createUser(authData);
    this.isLoading = false;
  }
}
