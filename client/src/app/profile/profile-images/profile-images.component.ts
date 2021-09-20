import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.scss'],
})
export class ProfileImagesComponent implements OnInit {
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
          ids: this.vids,
          fileType: 'image',
        })
        .subscribe((postData) => {
          this.thumbs = postData.posts;
          this.isLoading = false;
        });
    }

    // Fetching images from contributions
    if (!this.contribVids || this.contribVids.length === 0) {
      this.contribThumbs = [];
      this.isLoading = false;
    } else {
      this.postService
        .getPosts({
          postsPerPage: 10000,
          currentPage: 1,
          ids: this.contribVids,
          fileType: 'image',
        })
        .subscribe((postData) => {
          this.contribThumbs = postData.posts;
          this.isLoading = false;
        });
    }
  }
}
