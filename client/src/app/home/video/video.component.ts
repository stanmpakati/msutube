import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Details } from 'src/app/_models/details.interface';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  video!: Post;
  isLoading = true;
  details!: Details;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postService.getPost(id).subscribe((post) => {
          this.video = { ...post };
          console.log('this.video');
          this.details = {
            _id: post._id,
            title: post.title,
            description: post.description,
            tags: post.tags,
            createdAt: post.createdAt,
            views: 9,
            likes: 1,
          };
          this.isLoading = false;
        });
      } else {
        this.router.navigate(['404']);
      }
    });
  }
}
