import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    fileMimetype: string;
    file_public_id: string;
    thumb_public_id: string;
    duration: number;
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
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
    fileMimetype: string;
    file_public_id: string;
    thumb_public_id: string;
    duration: number;
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
      fileMimetype: string;
      file_public_id: string;
      thumb_public_id: string;
      duration: number;
    }>(`${videoUrl}/cloud`, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadFileDetails(file: Post) {
    const username = this.authService.getUsername();

    if (username) file.owners?.push(username);
    file.owners = [...new Set(file.owners)];

    // Todo throw error if no file url
    if (!file.file_public_id) return;

    this.http
      .post<{ message: string; postId: string }>(`${videoUrl}/post`, file)
      .subscribe(
        (res) => {
          this.openSnackBar(res.message, res.postId);

          if (res.postId) this.router.navigateByUrl(`/video/${res.postId}`);
          else this.router.navigateByUrl('/home');
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

  openSnackBar(content: string, postId: string) {
    // If there is no postId inform of error
    if (!postId)
      this._snackBar.open(
        'There seems to have been some error, please contact the developer',
        'close',
        {
          duration: 5000,
        }
      );
    else
      this._snackBar.open(content, 'close', {
        duration: 3000,
      });
  }
}
