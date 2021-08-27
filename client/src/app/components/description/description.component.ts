import { Component, Input, OnInit } from '@angular/core';
import { Details } from 'src/app/_models/details.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() details!: Details;
  isLiked = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Todo: check if liked if logged in

    if (this.authService.getUserId())
      this.postService
        .getIsLiked(this.details._id)
        .subscribe((res) => (this.isLiked = res.isLiked));
  }

  likeVideo() {
    this.isLiked = !this.isLiked;
    this.postService
      .likePost(this.details._id, !this.isLiked)
      .subscribe((res) => {
        this.isLiked = res.isLiked;
      });
  }
}
