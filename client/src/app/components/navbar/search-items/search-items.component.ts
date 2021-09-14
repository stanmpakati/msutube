import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss'],
})
export class SearchItemsComponent implements OnInit {
  @Input() searchResults!: Thumbnail[];

  constructor() {}

  ngOnInit(): void {}
}
