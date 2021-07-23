import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UploadService } from '../../_services/upload.service';
import { Post } from '../../_models/post';
import { User } from '../../_models/user';
import { Contributer } from '../../_models/contributer';
import { UserService } from '../../_services/user.service';
import { DetailsComponent } from '.././details/details.component';
import { CustomValidatorService } from 'src/app/_services/custom-validator.service';

@Component({
  selector: 'app-contributers-form',
  templateUrl: './contributers-form.component.html',
  styleUrls: ['./contributers-form.component.scss'],
})
export class ContributersFormComponent implements OnInit {
  contributersForm!: FormGroup;
  helpersForm!: FormGroup;
  partners: string[] = [];
  contributers: Contributer[] = [];
  contribSubmit = false;
  separatorKeyCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private customValidator: CustomValidatorService
  ) {}

  ngOnInit(): void {
    // this.contributersForm = this.fb.group({
    //   owners: [
    //     '',
    //     [Validators.required, Validators.email],
    //     this.customValidator.emailValidator.bind(this.customValidator),
    //   ],
    // });
    this.contributersForm = new FormGroup({
      partnersControl: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
        // asyncValidators: [this.customValidator.emailValidator],
        updateOn: 'blur',
      }),
    });

    // Todo maybe make a separate FormControl object
    this.helpersForm = new FormGroup({
      // TODO make required only if username has been completed
      username: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [this.customValidator.emailValidator],
        updateOn: 'blur',
      }),
      role: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  get owners() {
    return this.helpersForm.controls.owners;
  }

  get username() {
    return this.helpersForm.controls.username;
  }

  get role() {
    return this.helpersForm.controls.role;
  }

  get description() {
    return this.helpersForm.controls.description;
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

    if (val) {
      // this.partnersControl.updateValueAndValidity();

      // Check for user in the database
      // this.userService.getUser(val).pipe(
      //   debounceTime(1000),
      //   take(1),
      //   map((res) => {
      //     console.log(res.message);
      //     if (res.message === 'User found') {
      //       this.partners.push(res.user.username);
      //       event.chipInput?.clear();
      //     }
      //   })
      // );

      this.partners.push(val);
      event.chipInput?.clear();
    }
  }

  addContributer() {
    // Update error messages
    this.contribSubmit = true;
    // if (this.helpersForm.invalid) return;
    console.log('valid', this.username.value, this.helpersForm.value.username);

    // Confirm user with database
    // and add contributer
    this.userService.findUser(this.username.value).subscribe((res) => {
      const userShort: User = {
        username: res.user.username,
        email: res.user.email,
        profilePicUrl: res.user.profilePicUrl,
      };
      const newContributer: Contributer = {
        user: userShort,
        role: this.role.value,
        roleDetails: this.description.value,
      };
      this.contributers.push(newContributer);
      console.log(this.contributers);

      this.helpersForm.reset();
    });

    // reset Errors
    this.contribSubmit = false;
  }
}
