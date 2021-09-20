import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  fileType!: string;
  vids!: Thumbnail[];
  isLoading!: boolean;
  page!: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.route.data.subscribe((data) => {
      this.fileType = data.fileType;
    });

    this.route.paramMap.subscribe((params) => {
      const page = params.get('category');
      this.page = page!;

      // Get content
      this.postService
        .getPosts({
          postsPerPage: 1000,
          currentPage: 1,
          isFeatured: page === 'featured',
          latest: page === 'latest',
          trending: page === 'trending',
          fileType: this.fileType,
        })
        .subscribe((postData) => {
          this.vids = postData.posts;
          this.isLoading = false;
        });
    });
  }
}
