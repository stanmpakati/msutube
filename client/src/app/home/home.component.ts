import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import videojs from 'video.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('video', { static: true }) video!: ElementRef;

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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.pl
  }
}
