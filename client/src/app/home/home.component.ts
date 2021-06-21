import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Thumbnail } from '../_models/thumbnail';
// import videojs from 'video.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // @ViewChild('video', { static: true }) video!: ElementRef;

  @Input() options!: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
      src: string;
      type: string;
    };
    // player!: videojs.Player;
  };
  vids!: Thumbnail[];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const now = new Date();

    this.vids = [
      {
        title: 'My Fake Movie',
        length: '1.04:12',
        owner: 'Various Owners',
        thumbnailUrl: '',
        uploadDate: new Date(),
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
