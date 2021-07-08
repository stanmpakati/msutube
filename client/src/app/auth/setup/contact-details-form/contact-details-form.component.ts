import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.scss'],
})
export class ContactDetailsFormComponent implements OnInit {
  cdForm!: FormGroup;
  @Output() addContactDetails: EventEmitter<{
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
    whatsappLink: string;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.cdForm = new FormGroup({
      city: new FormControl(null),
      country: new FormControl(null),
      facebook: new FormControl(null),
      instagram: new FormControl(null),
      twitter: new FormControl(null),
      whatsapp: new FormControl(null),
    });
  }

  get facebook() {
    return this.cdForm.controls.facebook;
  }

  get instagram() {
    return this.cdForm.controls.facebook;
  }

  get twitter() {
    return this.cdForm.controls.facebook;
  }

  get whatsapp() {
    return this.cdForm.controls.facebook;
  }

  submit() {
    const contactDetails = {
      facebookLink: this.cdForm.value.facebook,
      instagramLink: this.cdForm.value.instagram,
      twitterLink: this.cdForm.value.twitter,
      whatsappLink: this.cdForm.value.whatsapp,
    };

    this.addContactDetails.emit(contactDetails);
  }
}
