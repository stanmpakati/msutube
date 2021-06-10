import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss'],
})
export class PersonalDetailsFormComponent implements OnInit {
  pdForm!: FormGroup;
  personalDetails!: {};
  submitted = false;
  @Output() addPersonalDetails: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.pdForm = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required],
      }),
      regnumber: new FormControl(null, {
        validators: [],
      }),
      bio: new FormControl('', {}),
    });
  }

  get firstname() {
    return this.pdForm.controls.firstname;
  }

  get lastname() {
    return this.pdForm.controls.firstname;
  }

  get regnumber() {
    return this.pdForm.controls.firstname;
  }

  get bio() {
    return this.pdForm.controls.firstname;
  }

  next() {
    console.log('clicked');
    this.submitted = true;
    if (this.pdForm.invalid) return;

    this.personalDetails = {
      firstname: this.pdForm.value.firstname,
      lastname: this.pdForm.value.lastname,
      regnumber: this.pdForm.value.regnumber,
      bio: this.pdForm.value.bio,
    };

    // console.log(this.personalDetails);
    this.addPersonalDetails.emit(this.personalDetails);
  }
}
