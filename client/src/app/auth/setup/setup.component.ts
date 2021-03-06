import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  details = 'Personal';
  isLoading = false;
  submitted = false;
  personal!: {
    firstname: string;
    lastname: string;
    regnumber?: string;
    bio?: string;
  };
  contact!: {
    facebookLink?: string;
    instagramLink?: string;
    twitterLink?: string;
    whatsappLink?: string;
    city?: string;
    country?: string;
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onNext(personalDetails: {
    firstname: string;
    lastname: string;
    regnumber?: string;
    bio?: string;
  }) {
    this.personal = { ...personalDetails };
    this.details = 'Contact';
  }

  toUpload(contactDetails: {
    facebookLink?: string;
    instagramLink?: string;
    twitterLink?: string;
    whatsappLink?: string;
    city?: string;
    country?: string;
  }) {
    this.contact = contactDetails;
    this.details = 'Profile';
  }

  onSubmit(profilePic: File) {
    this.isLoading = true;
    const user = {
      ...this.personal,
      ...this.contact,
    };
    console.log(profilePic);

    this.authService.createUser(user, profilePic);
  }
}
