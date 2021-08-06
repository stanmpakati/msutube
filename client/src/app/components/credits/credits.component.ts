import { Component, Input, OnInit } from '@angular/core';
import { Contributer } from 'src/app/_models/contributer';
import { Citation } from 'src/app/_models/reference.interface';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {
  @Input() owners!: string[];
  @Input() contributers?: Contributer[];
  @Input() citations?: Citation[];

  constructor() {}

  ngOnInit(): void {
    console.log('owners', this.owners);
    console.log('cont', this.contributers);
    console.log('cit', this.citations);
  }
}
