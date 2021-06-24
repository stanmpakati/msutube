import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UploadService } from '../_services/upload.service';
import { Post } from '../_models/post';
import { User } from '../_models/user';
import { Contributer } from '../_models/contributer';
import { UserService } from '../_services/user.service';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  // Upload form

  //details form
  // detailsForm!: FormGroup;
  // Contributers form
  contributesForm!: FormGroup;
  partners: User[] = [];
  contributers!: Contributer[];
  // Links form
  linksForm!: FormGroup;
  @ViewChild('detailsComponent')
  detailsComponent!: DetailsComponent;

  constructor(
    private uploadService: UploadService,

    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.contributesForm = new FormGroup({
      partners: new FormControl(),
      contributers: new FormControl(),
      username: new FormControl(null),
      // TODO make required only if username has been completed
      role: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  get detailsForm() {
    return this.detailsComponent?.detailsForm;
    // return this.detailsComponent ? this.detailsComponent.detailsForm : null;
  }

  // details --------------------------------------------------------------------------------------

  // Contributers -------------------------------------------------------------------------------------
  get username() {
    return this.contributesForm.controls.username;
  }

  removeContributer(contributer: Contributer) {
    const index = this.contributers.indexOf(contributer);

    if (index >= 0) this.contributers.splice(index, 1);
  }

  removePartner(partner: User) {
    const index = this.partners.indexOf(partner);

    if (index >= 0) this.partners.splice(index, 1);
  }

  addPartner(event: MatChipInputEvent) {
    const val = (event.value || '').trim();

    if (val) {
      this.userService.findUser(val).pipe(
        debounceTime(1000),
        take(1),
        map((res) => {
          if (res.message === 'User found') {
            this.partners.push(res.user);
            event.chipInput?.clear();
          }
        })
      );
    }
  }

  addContributer() {
    if (this.contributesForm.invalid) return;

    this.userService
      .findUser(this.contributesForm.value.username)
      .subscribe((resObj) => {
        const newContributer: Contributer = {
          user: resObj.user,
          role: this.contributesForm.value.role,
          roleDetails: this.contributesForm.value.description,
        };
        this.contributers.push(newContributer);
        this.contributesForm.reset();
      });
  }
}
