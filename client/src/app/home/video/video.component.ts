import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Details } from 'src/app/_models/details.interface';
import { Post } from 'src/app/_models/post';
import { PostService } from 'src/app/_services/post.service';
import { ThemeService } from 'src/app/_services/theme.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnDestroy {
  video!: Post;
  isLoading = true;
  details!: Details;
  isDarkMode!: boolean;
  themeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.themeStatusListener.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      }
    );
    this.themeService.getTheme();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postService.getPost(id).subscribe(
          (post) => {
            this.video = { ...post };
            this.details = {
              _id: post._id,
              title: post.title,
              description: post.description,
              tags: post.tags,
              createdAt: post.createdAt,
              views: post.views,
              likes: post.likes,
            };
            this.isLoading = false;
          },
          (err) => {
            this.router.navigate(['404/video']);
          }
        );

        // Add view after 10s
        setTimeout(() => {
          this.postService.addView(id).subscribe(() => this.details.views++);
        }, 5000);
      } else {
        this.router.navigate(['404']);
      }
    });
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
  }
}
