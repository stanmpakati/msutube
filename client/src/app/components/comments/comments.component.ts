import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Comment } from 'src/app/_models/comment.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];
  isLoading!: boolean;
  commentForm!: FormGroup;
  postId!: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.commentForm = new FormGroup({
      comment: new FormControl(null),
    });

    // Fetch comments
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postId = id;
        this.postService.getComments(id).subscribe((res) => {
          this.comments = res.comments;
          this.isLoading = false;
        });
      } else console.log('something wrong');
    });
  }

  get comment() {
    return this.commentForm.controls.comment;
  }

  commentSubmit() {
    if (this.authService.getUserId()) {
      const comment: Comment = {
        owner: this.authService.getUserId()!,
        comment: this.comment.value,
        createdAt: Date.now().toLocaleString(),
        likes: 0,
      };

      // Clear comment field
      this.comment.reset();

      // Add to comments
      this.comments.push(comment);

      // To Database
      this.postService.addComment(this.postId, this.comment.value).subscribe();
    }
  }
}
