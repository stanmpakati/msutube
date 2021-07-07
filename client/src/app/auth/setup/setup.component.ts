import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/_models/user-details';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  // details = 'Personal';
  details = 'Profile';
  isLoading = false;
  submitted = false;
  userDetails!: UserDetails;
  personal!: {
    firstname: string;
    lastname: string;
    regnumber: string;
    bio: string;
  };
  contact!: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  };
  @Input() personalDetails!: {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNext(personalDetails: {
    firstname: string;
    lastname: string;
    regnumber: string;
    bio: string;
  }) {
    this.personal = { ...personalDetails };
    console.log(personalDetails);
    this.details = 'Contact';
  }

  toUpload(contactDetails: {
    facebook: string;
    instagram: string;
    twitter: string;
    whatsapp: string;
  }) {
    this.contact = contactDetails;
    this.details = 'Profile';
  }

  onSubmit(contactDetails: {}) {
    const user = {
      ...this.personal,
      ...contactDetails,
    };

    console.log(user);
    this.router.navigateByUrl('/home');
  }
}
