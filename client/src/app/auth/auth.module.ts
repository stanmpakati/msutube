import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SetupComponent } from './setup/setup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, SetupComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
