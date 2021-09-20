import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  @Input() fileType!: string;
  vids!: Thumbnail[];
  isLoading!: boolean;
  linkTo!: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.linkTo = `/${this.fileType}s/featured`;

    this.postService
      .getPosts({
        postsPerPage: 12,
        currentPage: 1,
        isFeatured: true,
        fileType: this.fileType,
      })
      .subscribe((postData) => {
        this.vids = postData.posts;
        this.isLoading = false;
      });
  }
}
