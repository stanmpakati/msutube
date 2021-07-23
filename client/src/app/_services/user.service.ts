import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FullUser } from '../_models/user-details';

const userUrl = `${environment.host}/user`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findEmail(email: string) {
    return this.http.post<{ message: string }>(`${userUrl}/email`, {
      email: email,
    });
  }

  // Todo delete this one
  findUser(query: string): Observable<{ user: FullUser; message: string }> {
    return this.http.post<{ user: FullUser; message: string }>(
      `${userUrl}/search`,
      {
        query: query,
      }
    );
  }

  getUser(query: string) {
    return this.http.post<{ user: FullUser; message: string }>(
      `${userUrl}/search`,
      {
        query: query,
      }
    );
  }
}
