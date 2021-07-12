import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Auth } from '../_models/auth.model';
import { environment } from '../../environments/environment';
import { FullUser } from '../_models/user-details';

const authUrl = `${environment.host}/user`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;
  private tokenTimer!: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private userId!: string;
  private signupAuth!: Auth;

  constructor(private http: HttpClient, private router: Router) {}

  getSignupAuth() {
    return this.signupAuth;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveSignUpAuth(authDetails: Auth) {
    this.signupAuth = authDetails;
    this.router.navigateByUrl('/setup');
  }

  createUser() {
    // } //   country: string; //   city: string; //   bio: string; //   regnumber: string; //   lastname: string; //   firstname: string; //   whatsappLink: string; //   twitterLink: string; //   instagramLink: string; //   facebookLink: string; // otherDetails: { // pic: File,
    // const user: FullUser = {
    //   ...this.signupAuth,
    //   ...otherDetails,
    //   profilePicUrl: null,
    // };

    const mockUser: FullUser = {
      username: 'stan',
      email: 'me@stan.co.zw',
      profilePicUrl: null,
      firstname: 'stan',
      lastname: 'Mpakati',
      regnumber: 'R1911268h',
      bio: 'My Bio',
    };

    const userData = new FormData();

    Object.entries(mockUser).forEach(([key, value]) => {
      userData.append(key, value);
    });

    userData.append('password', 'Test123.');

    // First upload user details
    this.http.post(`${authUrl}/signup`, userData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
        this.authStatusListener.next(false);
      }
    );

    // then upload profile picture and get it's destination and
  }

  loginUser(authDetails: Auth, returnUrl: string) {
    this.http
      .post<{
        token: string;
        message: string;
        expiresIn: number;
        userId: string;
      }>(`${authUrl}/login`, authDetails)
      .subscribe(
        (response) => {
          console.log(response);
          this.token = response.token;

          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(this.token, expirationDate, this.userId);

            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.userId = response.userId;

            // Continue to where user was headed
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              return;
            }
            // Otherwise go to homepage
            this.router.navigateByUrl('/home');
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;

    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation!.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    this.clearAuthData();
    this.router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
  }

  findEmail(email: string) {
    return this.http.post<{ message: string }>(`${authUrl}/email`, {
      email: email,
    });
  }

  findUsernames(): Observable<{ usernames: string[] }> {
    return this.http.get<{ usernames: string[] }>(`${authUrl}/usernames`);
  }

  private setAuthTimer(duration: number) {
    console.log(`timer in ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate || !userId) return;

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
