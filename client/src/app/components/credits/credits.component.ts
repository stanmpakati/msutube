import { Component, Input, OnInit } from '@angular/core';
import { Contributer } from 'src/app/_models/contributer';
import { Citation } from 'src/app/_models/reference.interface';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {
  @Input() owners!: User;
  @Input() contributers!: Contributer[];
  @Input() citations!: Citation[];

  constructor() {}

  ngOnInit(): void {}
}
