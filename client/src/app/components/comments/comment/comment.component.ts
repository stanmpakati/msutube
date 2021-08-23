import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment.interface';
import { UserService } from 'src/app/_services/user.service';
import { timeAgo } from 'src/app/_services/time-ago.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  user!: User;
  isLoading = true;
  timeElapsed!: string;
  isLiked!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.timeElapsed = timeAgo(this.comment.createdAt);

    this.userService.getUser(this.comment.owner).subscribe((res) => {
      this.user = res.user;
      this.isLoading = false;
    });
  }

  likeComment() {
    this.isLiked = !this.isLiked;
    this.comment.likes++;
  }
}
