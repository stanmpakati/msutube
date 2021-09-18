import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Cloudinary } from 'cloudinary-core';
import { ShareButtonsPopupModule } from 'ngx-sharebuttons/popup';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// import {
//   CloudinaryModule,
//   CloudinaryConfiguration
// } from "@cloudinary/angular-5.x";

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
import { LatestComponent } from './home/latest/latest.component';
import { ProfileAudioComponent } from './profile/profile-audio/profile-audio.component';
import { ProfileImagesComponent } from './profile/profile-images/profile-images.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SafePipe } from './safe.pipe';
import {
  CloudinaryConfiguration,
  CloudinaryModule,
  CloudinaryVideo,
} from '@cloudinary/angular-5.x';
import { SearchItemComponent } from './components/navbar/search-item/search-item.component';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

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
    ProfileAudioComponent,
    ProfileImagesComponent,
    LatestComponent,
    NotFoundComponent,
    SafePipe,
    SearchItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule,

    // Share
    // ShareModule,
    ShareButtonsPopupModule,
    ShareButtonsModule.withConfig({
      debug: true,
    }),
    ShareIconsModule,

    // Angular Material imports
    MaterialModule,
    // With Shared stuff
    SharedModule,
    // Cloudinary module
    // CloudinaryModule.forRoot(Cloudinary, {
    //   cloud_name: 'stanmpakati',
    // } as CloudinaryConfiguration),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
