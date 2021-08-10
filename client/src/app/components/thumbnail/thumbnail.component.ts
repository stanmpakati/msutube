import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { timeAgo } from 'src/app/_services/time-ago.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
  @Input() thumbnailData!: Thumbnail;
  timeElapsed!: string;
  owner!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeElapsed = timeAgo(this.thumbnailData.createdAt);
    if (this.thumbnailData.owners.length > 1) this.owner = 'Various Owners';
    else this.owner = this.thumbnailData.owners[0];
  }

  navigateToPage() {
    this.router.navigate(['/video', this.thumbnailData._id]);
  }
}
