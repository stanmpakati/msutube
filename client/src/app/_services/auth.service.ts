import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Auth } from '../_models/auth.model';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

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
  private user!: User;

  constructor(private http: HttpClient, private router: Router) {}

  // Todo delete, it returns an error
  getSignupAuth() {
    return this.signupAuth;
  }

  getToken() {
    return this.token;
  }

  // Todo impliment this
  getUser() {
    return this.user;
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getProfileUrl() {
    return localStorage.getItem('profileUrl');
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveSignUpAuth(authDetails: Auth) {
    this.signupAuth = authDetails;
    this.router.navigateByUrl('/auth/setup');
  }

  createUser(
    otherDetails: {
      facebookLink?: string;
      instagramLink?: string;
      twitterLink?: string;
      whatsappLink?: string;
      firstname: string;
      lastname: string;
      regnumber?: string;
      bio?: string;
      city?: string;
      country?: string;
    },
    picture?: File
  ) {
    const user = {
      ...this.signupAuth,
      ...otherDetails,
      profilePicUrl: null,
    };

    const userData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (value) userData.append(key, value);
    });

    console.log(picture);
    if (picture) userData.append('profilePicture', picture);

    // First upload user details
    this.http.post(`${authUrl}/signup`, userData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/auth/login');
      },
      (error) => {
        console.log(error);
        this.authStatusListener.next(false);
      }
    );

    // then upload profile picture and get it's destination and
  }

  loginUser(authDetails: Auth, returnUrl?: string) {
    this.http
      .post<{
        token: string;
        message: string;
        expiresIn: number;
        userId: string;
        user: User;
      }>(`${authUrl}/login`, authDetails)
      .subscribe(
        (response) => {
          this.token = response.token;

          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.user = response.user;

            // Save to local storage
            this.saveAuthData(
              this.token,
              expirationDate,
              this.userId,
              this.user
            );

            // Continue to where user was headed
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              return;
            }
            // Otherwise go to homepage
            this.router.navigateByUrl('/video/61128b8a2e1998433cd98c0b');
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
    console.log('auth hit');
    return this.http.post<{ message: string }>(`${authUrl}/email`, {
      email: email,
    });
  }

  findUsernames(): Observable<{ usernames: string[] }> {
    return this.http.get<{ usernames: string[] }>(`${authUrl}/usernames`);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    user: User
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', user.username);
    localStorage.setItem(
      'profileUrl',
      user.profilePicUrl ? user.profilePicUrl : ''
    );
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
