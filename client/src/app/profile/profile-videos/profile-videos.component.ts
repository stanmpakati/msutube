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
    if (!this.vids || this.vids.length === 0) {
      this.thumbs = [];
      this.isLoading = false;
    } else {
      this.postService
        .getPosts({
          postsPerPage: 10000,
          currentPage: 1,
          ids: [...this.vids],
          fileType: 'video',
        })
        .subscribe((postData) => {
          this.thumbs = postData.posts;
          this.isLoading = false;
        });
    }

    // Fetching videos from contributions
    if (!this.contribVids || this.contribVids.length === 0) {
      this.contribThumbs = [];
      this.isLoading = false;
    } else {
      this.postService
        .getPosts({
          postsPerPage: 10000,
          currentPage: 1,
          ids: [...this.contribVids],
          fileType: 'video',
        })
        .subscribe((postData) => {
          this.contribThumbs = postData.posts;
          this.isLoading = false;
        });
    }
  }
}
