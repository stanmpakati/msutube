import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const videoUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private fileUploadingListener = new Subject<boolean>();
  private fileUploading = false;
  private fileDestDetails!: {
    fileUrl: string;
    thumbnailUrl: string;
    fileMimetype: 'video' | 'audio' | 'image';
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  get isFileUploading() {
    return this.fileUploadingListener.asObservable();
  }

  get getFileDestDetails() {
    return this.fileDestDetails;
  }

  set recordFileDestDetails(details: {
    fileUrl: string;
    thumbnailUrl: string;
    fileMimetype: 'video' | 'audio' | 'image';
  }) {
    this.fileDestDetails = details;
  }

  uploadFalse() {
    this.fileUploadingListener.next(false);
  }

  uploadVideo(image: File, file: File) {
    // Register upload and send to listeners
    this.fileUploadingListener.next(true);
    const token = this.authService.getToken();

    // Sending file to server
    const postData = new FormData();
    postData.append('thumbnail', image);
    postData.append('file', file);
    postData.append('token', token);

    return this.http.post<{
      message: string;
      fileUrl: string;
      thumbnailUrl: string;
      fileMimetype: 'video' | 'audio' | 'image';
    }>(videoUrl, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadFileDetails(file: Post) {
    const username = this.authService.getUsername();

    if (username) file.owners?.push(username);
    else console.log('No Username');
    file.owners = [...new Set(file.owners)];

    console.log(file?.owners);

    this.http.post(`${videoUrl}/post`, file).subscribe(
      (response) => {
        console.log(response);

        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // updatePost(post: Post, image: File | string) {
  //   let postData: FormData | Post;

  //   if (typeof image == 'object') {
  //     postData = new FormData();
  //     postData.append('id', post.id);
  //     postData.append('title', post.title);
  //     postData.append('content', post.content);
  //     postData.append('image', image, post.title);
  //   } else {
  //     postData = { ...post, imagePath: image };
  //   }

  //   this.http
  //     .patch(`http://localhost:5000/api/posts/${post.id}`, postData)
  //     .subscribe((response) => console.log(response));
  // }

  // deletePost(postId: string) {
  //   this.http
  //     .delete(`http://localhost:5000/api/posts/${postId}`)
  //     .subscribe(() => {
  //       const updatedPosts = this.posts.filter((post) => post.id !== postId);
  //       this.posts = updatedPosts;
  //       this.postsUpdated.next({
  //         posts: [...this.posts],
  //         postCount: this.totalPosts,
  //       });
  //     });
  // }
}
