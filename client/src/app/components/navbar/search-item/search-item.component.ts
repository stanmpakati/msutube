import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { timeAgo } from 'src/app/_services/time-ago.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() thumbnail!: Thumbnail;
  owner!: string;
  timeElapsed!: string;

  constructor() {}

  ngOnInit(): void {
    if (this.thumbnail.owners.length > 1) this.owner = 'Various Owners';
    else this.owner = this.thumbnail.owners[0];

    this.timeElapsed = timeAgo(this.thumbnail.createdAt);
  }
}
