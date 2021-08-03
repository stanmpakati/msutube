import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
          this.video = post;
          this.isLoading = false;
        });
      } else {
        this.router.navigate(['404']);
      }
    });
  }
}
