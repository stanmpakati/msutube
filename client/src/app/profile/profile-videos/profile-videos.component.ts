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
  thumbs!: Thumbnail[];
  isLoading = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(1000, 1, '', this.vids).subscribe((postData) => {
      this.thumbs = postData.posts;
      this.isLoading = false;
    });
  }
}
