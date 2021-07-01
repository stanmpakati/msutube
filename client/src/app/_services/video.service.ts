import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';

const videoUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient, private router: Router) {}

  uploadVideo(image: File, video: File) {
    console.log('uploading');
    const postData = new FormData();
    postData.append('thumbnail', image);
    postData.append('video', video);

    return this.http.post<{
      message: string;
      fileUrl: string;
      thumbnailUrl: string;
    }>(videoUrl, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
