import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment } from 'src/app/_models/comment.interface';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];
  isLoading!: boolean;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postService.getComments(id).subscribe((res) => {
          this.comments = res.comments;
          this.isLoading = false;
        });
      } else console.log('something wrong');
    });
  }
}
