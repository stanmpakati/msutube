import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/_models/user-details';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  details = 'Personal';
  isLoading = false;
  submitted = false;
  userDetails!: UserDetails;
  personal!: {
    firstname: string;
    lastname: string;
    regnumber: string;
    bio: string;
  };
  contact!: {};
  @Input() personalDetails!: {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNext(personalDetails: {
    firstname: string;
    lastname: string;
    regnumber: string;
    bio: string;
  }) {
    this.details = 'Contact';
    this.personal = { ...personalDetails };
    console.log(personalDetails);
  }

  toUpload(contactDetails: {}) {}

  onSubmit(contactDetails: {}) {
    const user = {
      ...this.personal,
      ...contactDetails,
    };

    console.log(user);
    this.router.navigateByUrl('/home');
  }
}
