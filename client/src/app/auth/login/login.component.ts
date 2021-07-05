import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

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
    if (this.form.invalid) return;
    this.isLoading = true;
    this.submitted = true;

    const auth: Auth = {
      email: this.form.value.email,
      username: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.loginUser(auth);
    this.form.reset();
    this.isLoading = false;
  }
}
