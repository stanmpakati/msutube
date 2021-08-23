import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import {
  NoFileDialogComponent,
  UploadComponent,
} from './upload/upload.component';
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
import { SharedModule } from './shared/shared.module';
import { CommentComponent } from './components/comments/comment/comment.component';
import { ProfileVideosComponent } from './profile/profile-videos/profile-videos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BottomNavbarComponent,
    UploadComponent,
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
    CommentComponent,
    ProfileVideosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Angular Material imports
    MaterialModule,
    // With Shared stuff
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
