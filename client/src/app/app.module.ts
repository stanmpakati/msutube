import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SetupComponent } from './auth/setup/setup.component';
import { ContactDetailsFormComponent } from './auth/setup/contact-details-form/contact-details-form.component';
import { PersonalDetailsFormComponent } from './auth/setup/personal-details-form/personal-details-form.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { UploadComponent } from './upload/upload.component';
import { FileDropDirective } from './_helpers/file-drop.directive';
import { DetailsComponent } from './upload/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SetupComponent,
    ContactDetailsFormComponent,
    PersonalDetailsFormComponent,
    HomeComponent,
    NavbarComponent,
    BottomNavbarComponent,
    UploadComponent,
    FileDropDirective,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,

    // TODO: material imports separate later
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatChipsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
