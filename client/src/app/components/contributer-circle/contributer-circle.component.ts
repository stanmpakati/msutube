import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contributer } from 'src/app/_models/contributer';
import {
  MatMenuTrigger,
  MenuPositionX,
  MenuPositionY,
} from '@angular/material/menu';

@Component({
  selector: 'app-contributer-circle',
  templateUrl: './contributer-circle.component.html',
  styleUrls: ['./contributer-circle.component.scss'],
})
export class ContributerCircleComponent implements OnInit {
  @Input() contributer!: string;
  @ViewChild('popover') popover!: PopoverComponent;
  isConfirm = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onClose() {
    this.isConfirm = false;
    this.popover.close();
  }
  onConfirm() {
    this.isConfirm = true;
    this.popover.close();
  }
  openPopover() {
    this.popover.open();
  }
}

@Component({
  selector: 'app-popover',
  templateUrl: './contributer-circle.component.html',
  // styleUrls: ['./contributer-circle.component.scss'],
})
export class PopoverComponent {
  @ViewChild(MatMenuTrigger) private matMenuTrigger!: MatMenuTrigger;

  open() {
    this.matMenuTrigger.openMenu();
  }

  close() {
    this.matMenuTrigger.closeMenu();
  }
}
