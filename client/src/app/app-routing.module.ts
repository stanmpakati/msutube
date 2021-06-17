import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SetupComponent } from './auth/setup/setup.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'setup', component: SetupComponent },

  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
