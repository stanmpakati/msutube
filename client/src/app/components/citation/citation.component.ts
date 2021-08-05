import { Component, Input, OnInit } from '@angular/core';
import { Citation } from 'src/app/_models/reference.interface';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.scss'],
})
export class CitationComponent implements OnInit {
  @Input() citation!: Citation;

  constructor() {}

  ngOnInit(): void {}
}
