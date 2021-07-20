import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent implements OnInit {
  vids!: Thumbnail[];

  constructor() {}

  ngOnInit(): void {
    this.vids = [
      {
        title: 'My Fake Movie',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date('July 20, 2020 16:24:00'),
      },
      {
        title: 'My Second Fake Video',
        length: '09:52',
        owner: 'stanmpakati',
        thumbnailUrl: '',
        uploadDate: new Date(),
      },
    ];
  }
}
