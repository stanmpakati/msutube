import { Component, Input, OnInit } from '@angular/core';
import { Thumbnail } from 'src/app/_models/thumbnail';

@Component({
  selector: 'app-render-tiles',
  templateUrl: './render-tiles.component.html',
  styleUrls: ['./render-tiles.component.scss'],
})
export class RenderTilesComponent implements OnInit {
  @Input() vids!: Thumbnail[];
  @Input() featureName!: string;
  @Input() linkTo!: string;

  constructor() {}

  ngOnInit(): void {}
}
