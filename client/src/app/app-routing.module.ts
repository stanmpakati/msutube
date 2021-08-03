import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SetupComponent } from './auth/setup/setup.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './home/video/video.component';
import { MusicComponent } from './music/music.component';
import { PicturesComponent } from './pictures/pictures.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'setup', component: SetupComponent, canActivate: [AuthGuard] },

  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'music', component: MusicComponent },
  { path: 'pictures', component: PicturesComponent },
  // TODO: authguard: , canActivate: [AuthGuard]
  { path: 'profile', component: ProfileComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'videos/featured', component: FeaturedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
