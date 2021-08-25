import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  thing!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.thing = 'Page';

    this.route.paramMap.subscribe((params) => {
      const page = params.get('page');

      if (page === 'video') this.thing = 'Video';
      else if (page === 'user') this.thing = 'User';
      else this.thing = 'Page';
    });
  }
}
