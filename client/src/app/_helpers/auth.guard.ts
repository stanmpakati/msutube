import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Send users to login if they want to do some stuff
    const isAuth = this.authService.getIsAuthenticated();

    if (!isAuth && state.url != '/auth/setup') {
      this.openSnackBar("Sorry we don't have your login details");
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    // Prevent reroute to signup if auth details aren't available
    if (state.url === '/auth/setup') {
      const hasAuthData = this.authService.getSignupAuth();
      if (!hasAuthData) {
        this.router.navigateByUrl('/auth/signup');
        this.openSnackBar(
          "Sorry we don't have your Username, Email and Password details"
        );
      }
    }

    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  // Display some message
  openSnackBar(content: string = "Sorry, you can't go there") {
    this._snackBar.open(content, 'close', {
      duration: 3000,
    });
  }
}
