import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/_models/auth.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  submitted = false;
  hide = true;
  form!: FormGroup;
  private authStatusSub!: Subscription;
  isDark = true;
  returnUrl!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: 'blur',
      }),
    });

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        console.log(authStatus);
        this.isLoading = false;
      });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  get formControl() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  onLogin() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.isLoading = true;

    console.log(this.returnUrl);

    const auth: Auth = {
      email: this.form.value.email,
      username: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.loginUser(auth, this.returnUrl);
    // this.form.reset();
    this.isLoading = false;
  }
}
