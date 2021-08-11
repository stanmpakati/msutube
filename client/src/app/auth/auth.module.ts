import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SetupComponent } from './setup/setup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactDetailsFormComponent } from './setup/contact-details-form/contact-details-form.component';
import { PersonalDetailsFormComponent } from './setup/personal-details-form/personal-details-form.component';
import {
  ImageCropperDialog,
  MediaComponent,
} from './setup/media/media.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SetupComponent,
    ContactDetailsFormComponent,
    PersonalDetailsFormComponent,
    MediaComponent,
    ImageCropperDialog,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class AuthModule {}
