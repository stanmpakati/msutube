import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
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

  findUser(query: string): Observable<{ user: User; message: string }> {
    return this.http.post<{ user: User; message: string }>(
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
