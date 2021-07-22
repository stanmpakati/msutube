import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contributer } from 'src/app/_models/contributer';
@Component({
  selector: 'app-contributer-circle',
  templateUrl: './contributer-circle.component.html',
  styleUrls: ['./contributer-circle.component.scss'],
})
export class ContributerCircleComponent implements OnInit {
  // @ViewChild('popover') popover!: PopoverComponent;
  @Input() contributer!: string;
  isConfirm = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClose() {
    this.isConfirm = false;
    // this.popover.close();
  }

  openPopover() {
    // this.popover.open();
  }
}
