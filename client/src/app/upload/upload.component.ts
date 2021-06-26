import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { DetailsComponent } from './details/details.component';
import { ContributersFormComponent } from './contributers-form/contributers-form.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  linksForm!: FormGroup;
  @ViewChild('detailsComponent', { static: false })
  detailsComponent!: DetailsComponent;

  @ViewChild('contributersFormComponent', { static: false })
  contributersFormComponent!: ContributersFormComponent;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   this.contributersFormComponent = new ContributersFormComponent()
  // }

  get detailsForm() {
    return this.detailsComponent?.detailsForm;
  }

  get contributersForm() {
    return this.contributersFormComponent?.contributesForm;
  }

  // Contributers -------------------------------------------------------------------------------------
}
