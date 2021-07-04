import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UploadService } from '../../_services/upload.service';
import { Post } from '../../_models/post';
import { User } from '../../_models/user';
import { Contributer } from '../../_models/contributer';
import { UserService } from '../../_services/user.service';
import { DetailsComponent } from '.././details/details.component';

@Component({
  selector: 'app-contributers-form',
  templateUrl: './contributers-form.component.html',
  styleUrls: ['./contributers-form.component.scss'],
})
export class ContributersFormComponent implements OnInit {
  contributesForm!: FormGroup;
  helpersForm!: FormGroup;
  partners: string[] = [];
  contributers!: Contributer[];
  contribSubmit = false;
  separatorKeyCodes = [ENTER, COMMA] as const;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.contributesForm = new FormGroup({
      partners: new FormControl(),
      contributers: new FormControl(),
    });

    this.helpersForm = new FormGroup({
      // TODO make required only if username has been completed
      username: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      role: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  get username() {
    return this.helpersForm.controls.username;
  }

  get role() {
    return this.helpersForm.controls.role;
  }

  removeContributer(contributer: Contributer) {
    const index = this.contributers.indexOf(contributer);

    if (index >= 0) this.contributers.splice(index, 1);
  }

  removePartner(partner: string) {
    const index = this.partners.indexOf(partner);

    if (index >= 0) this.partners.splice(index, 1);
  }

  addPartner(event: MatChipInputEvent) {
    const val = (event.value || '').trim();

    // if (val) {
    //   this.userService.findUser(val).pipe(
    //     debounceTime(1000),
    //     take(1),
    //     map((res) => {
    //       if (res.message === 'User found') {
    //         this.partners.push(res.user);
    //         event.chipInput?.clear();
    //       }
    //     })
    //   );
    // }
    if (val) {
      this.partners.push(val);
      event.chipInput?.clear();
    }
  }

  addContributer() {
    // Update error messages
    this.contribSubmit = true;
    if (this.contributesForm.invalid) return;

    // Confirm user with database
    // and add contributer
    this.userService
      .findUser(this.contributesForm.value.username)
      .subscribe((resObj) => {
        const newContributer: Contributer = {
          user: resObj.user,
          role: this.contributesForm.value.role,
          roleDetails: this.contributesForm.value.description,
        };
        this.contributers.push(newContributer);
        console.log(this.contributers);

        this.contributesForm.reset();
      });

    // reset Errors
    this.contribSubmit = false;
  }
}
