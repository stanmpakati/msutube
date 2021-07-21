import { Component, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  vids!: Thumbnail[];

  constructor() {}

  ngOnInit(): void {
    this.vids = [
      {
        title: 'A Fake Trending Video',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date('July 20, 2020 16:24:00'),
      },
      {
        title: 'My Second Fake Video with a really long title',
        length: '09:52',
        owner: 'stanmpakati',
        thumbnailUrl: '',
        uploadDate: new Date(),
      },
      {
        title: 'My Third Fake Movie',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date('December 20, 2020 16:24:00'),
      },
      {
        title: 'My fourth Fake Video',
        length: '19:52',
        owner: 'stanmpakati',
        thumbnailUrl: '',
        uploadDate: new Date(),
      },
      {
        title: 'My Fifth Fake Movie',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date('July 20, 2021 16:24:00'),
      },
      {
        title: 'My Sixth Fake Video',
        length: '03:22',
        owner: 'ganizanimpakati',
        thumbnailUrl: '',
        uploadDate: new Date(),
      },
      {
        title: 'My Sevent Fake Movie',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date('July 21, 2021 06:24:00'),
      },
      {
        title: 'My Last Fake Video',
        length: '09:52',
        owner: 'stanmpakati',
        thumbnailUrl: '',
        uploadDate: new Date(),
      },
    ];
  }
}
