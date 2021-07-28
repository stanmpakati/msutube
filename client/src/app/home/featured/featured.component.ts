import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  vids!: Thumbnail[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts(10, 1).subscribe((postData) => {
      console.log(postData);
      // this.vids =  postData.posts;
    });
  }
}
