import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  vids!: Thumbnail[];
  isLoading!: boolean;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService
      .getPosts({
        postsPerPage: 10,
        currentPage: 1,
        isFeatured: true,
        fileType: 'video',
      })
      .subscribe((postData) => {
        this.vids = postData.posts;
        this.isLoading = false;
      });
  }
}
