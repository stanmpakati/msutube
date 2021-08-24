import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-profile-videos',
  templateUrl: './profile-videos.component.html',
  styleUrls: ['./profile-videos.component.scss'],
})
export class ProfileVideosComponent implements OnInit {
  @Input() vids!: string[];
  @Input() contribVids!: string[];
  thumbs!: Thumbnail[];
  contribThumbs!: Thumbnail[];
  isLoading = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Fetching Owned Videos
    this.postService
      .getPosts({ postsPerPage: 10000, currentPage: 1, ids: this.vids })
      .subscribe((postData) => {
        this.thumbs = postData.posts;
        this.isLoading = false;
      });

    // Fetching videos from contributions
    this.postService
      .getPosts({ postsPerPage: 10000, currentPage: 1, ids: this.contribVids })
      .subscribe((postData) => {
        this.contribThumbs = postData.posts;
        this.isLoading = false;
      });
  }
}
