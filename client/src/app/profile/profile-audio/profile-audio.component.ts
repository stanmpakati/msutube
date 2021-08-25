import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-profile-audio',
  templateUrl: './profile-audio.component.html',
  styleUrls: ['./profile-audio.component.scss'],
})
export class ProfileAudioComponent implements OnInit {
  @Input() vids!: string[];
  @Input() contribVids!: string[];
  thumbs!: Thumbnail[];
  contribThumbs!: Thumbnail[];
  isLoading = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Fetching Owned Videos
    this.postService
      .getPosts({
        postsPerPage: 10000,
        currentPage: 1,
        ids: this.vids,
        fileType: 'audio',
      })
      .subscribe((postData) => {
        this.thumbs = postData.posts;
        this.isLoading = false;
      });

    // Fetching videos from contributions
    this.postService
      .getPosts({
        postsPerPage: 10000,
        currentPage: 1,
        ids: this.contribVids,
        fileType: 'audio',
      })
      .subscribe((postData) => {
        this.contribThumbs = postData.posts;
        this.isLoading = false;
      });
  }
}
