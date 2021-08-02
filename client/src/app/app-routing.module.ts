import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SetupComponent } from './auth/setup/setup.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContentScreenComponent } from './content-screen/content-screen.component';
import { FeaturedComponent } from './home/featured/featured.component';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { PicturesComponent } from './pictures/pictures.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: 'videos/featured', component: FeaturedComponent },
  { path: 'videos/', component: ContentScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
