import { Component, Input, OnInit } from '@angular/core';

import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {
  @Input() fileType!: string;
  thumbs!: Thumbnail[];
  isLoading!: boolean;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService
      .getPosts({
        postsPerPage: 10,
        currentPage: 1,
        trending: true,
        fileType: this.fileType,
      })
      .subscribe((postData) => {
        this.thumbs = postData.posts;
        this.isLoading = false;
      });
  }
}
