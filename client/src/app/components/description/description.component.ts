import { Component, Input, OnInit } from '@angular/core';
import { Details } from 'src/app/_models/details.interface';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() details!: Details;
  isLiked!: boolean;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Todo: check if liked if logged in
    this.postService
      .getIsLiked(this.details._id)
      .subscribe((res) => (this.isLiked = res.isLiked));
  }

  likeVideo() {
    this.isLiked = !this.isLiked;
    this.postService
      .likePost(this.details._id, !this.isLiked)
      .subscribe((res) => {
        if (res.isLiked) this.isLiked = res.isLiked;
      });
  }
}
