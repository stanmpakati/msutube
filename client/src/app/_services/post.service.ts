import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../_models/post';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Thumbnail } from '../_models/thumbnail';

const postsUrl = `${environment.host}/video`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number, fileType?: string) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}&filetype=${fileType}`;
    return this.http.get<{ posts: Thumbnail[]; maxPosts: number }>(
      `${postsUrl}${queryParams}`
    );
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
  }

  // getPostsListener(): Observable<{ posts: Post[]; postCount: number }> {
  //   return this.postsUpdated.asObservable();
  // }

  getPost(id: string) {
    return this.http.get<Post>(`${postsUrl}/${id}`);
  }
}
