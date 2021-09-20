import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  @Input() fileType!: string;
  vids!: Thumbnail[];
  isLoading!: boolean;
  linkTo!: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.linkTo = `/${this.fileType}s/trending`;

    this.postService
      .getPosts({
        postsPerPage: 10,
        currentPage: 1,
        trending: true,
        fileType: this.fileType,
      })
      .subscribe((postData) => {
        this.vids = postData.posts;
        this.isLoading = false;
      });
  }
}
