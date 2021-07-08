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

  createUser(
    pic: File,
    otherDetails: {
      facebookLink: string;
      instagramLink: string;
      twitterLink: string;
      whatsappLink: string;
      firstname: string;
      lastname: string;
      regnumber: string;
      bio: string;
    }
  ) {
    const user: FullUser = {
      ...this.signupAuth,
      ...otherDetails,
      profilePicUrl: null,
    };

    // First upload user details
    this.http.post(`${authUrl}/signup`, user).subscribe(
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

  loginUser(authDetails: Auth) {
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
            this.router.navigateByUrl('/');
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
