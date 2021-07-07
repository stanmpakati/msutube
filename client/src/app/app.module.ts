import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

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
import {
  NoFileDialogComponent,
  UploadComponent,
} from './upload/upload.component';
import { FileDropDirective } from './_helpers/file-drop.directive';
import { DetailsComponent } from './upload/details/details.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { MusicComponent } from './music/music.component';
import { PicturesComponent } from './pictures/pictures.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FeaturedComponent } from './home/featured/featured.component';
import {
  FileUploadComponent,
  ThumbCheckDialog,
} from './upload/file-upload/file-upload.component';
import { ContributersFormComponent } from './upload/contributers-form/contributers-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ContributerCircleComponent } from './components/contributer-circle/contributer-circle.component';
import { MediaComponent } from './auth/setup/media/media.component';

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
    ThumbnailComponent,
    MusicComponent,
    PicturesComponent,
    TopNavComponent,
    FeaturedComponent,
    FileUploadComponent,
    ContributersFormComponent,
    ProfileComponent,
    ThumbCheckDialog,
    NoFileDialogComponent,
    ContributerCircleComponent,
    MediaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    FlexLayoutModule,

    // TODO: material imports separate later
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatChipsModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
