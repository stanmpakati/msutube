import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { Post } from '../_models/post';
import { Thumbnail } from '../_models/thumbnail';
import { Comment } from '../_models/comment.interface';

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

  addView(id: string) {
    return this.http.get<Post>(`${postsUrl}/view/${id}`);
  }

  getIsLiked(postId: string) {
    return this.http.get<{ isLiked: boolean }>(`${postsUrl}/like/${postId}`);
  }

  likePost(postId: string, status: boolean) {
    return this.http.patch<{ message: string; isLiked: boolean }>(
      `${postsUrl}/like/${postId}`,
      { status: status }
    );
  }

  getComments(postId: string) {
    return this.http.get<{ maxComments: number; comments: Comment[] }>(
      `${postsUrl}/comment/${postId}`
    );
  }

  addComment(postId: string, comment: String) {
    return this.http.post<{ message: string; comment: Comment }>(
      `${postsUrl}/comment/${postId}`,
      { comment: comment }
    );
  }
}
