import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { FeaturedComponent } from './home/featured/featured.component';
import {
  FileUploadComponent,
  ThumbCheckDialog,
  ThumbnailCropperDialog,
} from './upload/file-upload/file-upload.component';
import { ContributersFormComponent } from './upload/contributers-form/contributers-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ContributerCircleComponent } from './components/contributer-circle/contributer-circle.component';
import {
  ImageCropperDialog,
  MediaComponent,
} from './auth/setup/media/media.component';
import { MaterialModule } from './shared/material/material.module';
import { RenderTilesComponent } from './components/render-tiles/render-tiles.component';
import { TrendingComponent } from './home/trending/trending.component';
import { ReferencesFormComponent } from './upload/references-form/references-form.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { VideoComponent } from './home/video/video.component';
import { DescriptionComponent } from './components/description/description.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { OwnerComponentComponent } from './components/owner-component/owner-component.component';
import { CitationComponent } from './components/citation/citation.component';

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
    FeaturedComponent,
    FileUploadComponent,
    ThumbnailCropperDialog,
    ContributersFormComponent,
    ProfileComponent,
    ThumbCheckDialog,
    NoFileDialogComponent,
    ContributerCircleComponent,
    MediaComponent,
    ImageCropperDialog,
    RenderTilesComponent,
    TrendingComponent,
    ReferencesFormComponent,
    VideoComponent,
    DescriptionComponent,
    CreditsComponent,
    CommentsComponent,
    SuggestionsComponent,
    OwnerComponentComponent,
    CitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    FlexLayoutModule,

    // Angular Material imports
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
