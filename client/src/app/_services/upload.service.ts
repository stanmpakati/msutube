import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';

const videoUrl = `${environment.host}/videos`;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private posts: Post[] = [];
  private totalPosts!: number;
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number): void {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<any>(`http://localhost:5000/api/posts${queryParams}`)
      .pipe(
        map((postData) => ({
          posts: postData.posts.map((post: any) => ({
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            id: post._id,
            creator: post.creator,
          })),
          maxPosts: postData.maxPosts,
        }))
      )
      .subscribe((postData) => {
        console.log(postData);
        this.posts = postData.posts;
        this.totalPosts = postData.maxPosts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: postData.maxPosts,
        });
      });
  }

  getPostsListener(): Observable<{ posts: Post[]; postCount: number }> {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<Post>(`http://localhost:5000/api/posts/${id}`);
  }

  uploadVideo(post: Post, image: File) {
    console.log('uploading');
    console.log(image);
    const postData = new FormData();
    // postData.append('id', post.id);
    // postData.append('title', post.title);
    // postData.append('content', post.content);
    postData.append('image', image, 'post.title');

    this.http
      .post<{ message: string; post: Post }>(
        // videoUrl,
        'http://localhost:5000/api/posts',
        postData
        // {observe: 'response'}
      )
      .subscribe((response) => {
        console.log(response);
        // this.posts.push(response.post);
        // this.postsUpdated.next({posts: [...this.posts], postCount: response.maxPosts});
        // this.router.navigate(['/']);
      });
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
