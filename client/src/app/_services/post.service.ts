import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Medium } from '../_models/post';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

const postsUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Medium[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number): void {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<any>(`${postsUrl}${queryParams}`)
      // .pipe(
      //   map((postData) => ({
      //     posts: postData.posts.map((post: any) => ({
      //       title: post.title,
      //       content: post.content,
      //       imagePath: post.imagePath,
      //       id: post._id,
      //       creator: post.creator,
      //     })),
      //     maxPosts: postData.maxPosts,
      //   }))
      // )
      .subscribe((postData) => {
        console.log(postData);
        this.posts = postData.posts;
      });
  }

  // getPostsListener(): Observable<{ posts: Post[]; postCount: number }> {
  //   return this.postsUpdated.asObservable();
  // }

  getPost(id: string) {
    return this.http.get<Medium>(`http://localhost:5000/api/posts/${id}`);
  }
}
