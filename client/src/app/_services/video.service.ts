import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const videoUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient, private router: Router) {}
}
