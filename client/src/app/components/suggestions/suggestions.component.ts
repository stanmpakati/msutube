import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  isLoading = true;
  vids!: Thumbnail[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(10, 1, 'video').subscribe((postData) => {
      this.vids = postData.posts;
      this.isLoading = false;
    });
  }
}
