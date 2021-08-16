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

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    // Todo: check if liked
  }

  likeVideo() {
    this.postService.likePost(this.details._id);
  }
}
