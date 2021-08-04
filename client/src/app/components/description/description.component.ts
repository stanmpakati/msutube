import { Component, Input, OnInit } from '@angular/core';
import { Details } from 'src/app/_models/details.interface';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() details!: Details;

  constructor() {}

  ngOnInit(): void {}
}
