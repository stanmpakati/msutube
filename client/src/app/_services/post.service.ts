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

  getPosts(query: {
    postsPerPage?: number;
    currentPage?: number;
    fileType: string;
    ids?: string[];
    isFeatured?: boolean;
    trending?: boolean;
    latest?: boolean;
    searchQuery?: string;
  }) {
    const {
      postsPerPage,
      currentPage,
      fileType,
      ids,
      isFeatured,
      trending,
      latest,
      searchQuery,
    } = query;

    // Declare Query params
    let queryParams = '?';

    // Fill Query params
    if (postsPerPage) queryParams += `pagesize=${postsPerPage}&`;
    if (currentPage) queryParams += `page=${currentPage}&`;
    if (fileType) queryParams += `filetype=${fileType}&`;
    if (ids) queryParams += `ids=${ids}&`;
    if (isFeatured) queryParams += `isFeatured=${isFeatured}&`;
    if (trending) queryParams += `trending=${trending}&`;
    if (latest) queryParams += `latest=${latest}`;
    if (searchQuery) queryParams += `search=${searchQuery}`;

    return this.http.get<{ posts: Thumbnail[]; maxPosts: number }>(
      `${postsUrl}${queryParams}`
    );
  }

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
