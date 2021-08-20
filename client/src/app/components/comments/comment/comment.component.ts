import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment.interface';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  user!: User;
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(this.comment.owner).subscribe((res) => {
      this.user = res.user;
      this.isLoading = false;
    });
  }
}
