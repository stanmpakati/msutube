import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Contributer } from '../_models/contributer';

const videoUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private fileUploadingListener = new Subject<boolean>();
  private fileUploading = false;
  // for Form Upload
  private fileDetails!: {
    title: string;
    description: string;
    tags: string[];
  };
  private contibuters!: { owners?: string[]; contributers?: Contributer[] };
  private fileRefs!: {};
  private fileDestDetails!: {
    fileUrl: string;
    thumbnailUrl: string;
    fileMimetype: string;
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  get isFileUploading() {
    return this.fileUploadingListener.asObservable();
  }

  set recordFileDestDetails(details: {
    fileUrl: string;
    thumbnailUrl: string;
    fileMimetype: string;
  }) {
    this.fileDestDetails = details;
  }

  set recordDetails(details: {
    title: string;
    description: string;
    tags: string[];
  }) {
    this.fileDetails = details;
  }

  set recordContributers(contibuters: {
    owners?: string[];
    contibuters?: Contributer[];
  }) {
    this.contibuters = contibuters;
  }

  set recordRefs(refs: {}) {
    this.fileRefs = refs;
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
    }>(videoUrl, postData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  finishFileUpload() {}

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
