import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Thumbnail } from 'src/app/_models/thumbnail';
import { timeAgo } from 'src/app/_services/time-ago.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() thumbnail!: Thumbnail;
  @Output() clear = new EventEmitter();
  owner!: string;
  timeElapsed!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.thumbnail.owners.length > 1) this.owner = 'Various Owners';
    else this.owner = this.thumbnail.owners[0];

    this.timeElapsed = timeAgo(this.thumbnail.createdAt);
  }

  navigateToPage() {
    this.router.navigate(['/video', this.thumbnail._id]);
    this.clear.emit();
  }
}
