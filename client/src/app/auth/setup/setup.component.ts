import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

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
  // @Input() personalDetails!: {};

  constructor(private authService: AuthService) {}

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

  onSubmit(profilePic: File) {
    const user = {
      ...this.personal,
      ...this.contact,
    };
    console.log(user);

    this.authService.createUser(profilePic, user);
  }
}
