import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './home/video/video.component';
import { MusicComponent } from './music/music.component';
import { PicturesComponent } from './pictures/pictures.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'music', component: MusicComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'video/:id', component: VideoComponent },
  {
    path: 'videos/:category',
    component: PostsComponent,
    data: { fileType: 'video' },
  },
  {
    path: 'audios/:category',
    component: PostsComponent,
    data: { fileType: 'audio' },
  },
  {
    path: 'images/:category',
    component: PostsComponent,
    data: { fileType: 'image' },
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404/:page', component: NotFoundComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
