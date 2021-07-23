import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Reference } from 'src/app/_models/reference.interface';

@Component({
  selector: 'app-references-form',
  templateUrl: './references-form.component.html',
  styleUrls: ['./references-form.component.scss'],
})
export class ReferencesFormComponent implements OnInit {
  refForm!: FormGroup;
  references: Reference[] = [];
  today = new Date();
  min!: Date | null;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    const urlRegex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.refForm = new FormGroup({
      author: new FormControl(null, {
        validators: [],
        updateOn: 'submit',
      }),
      publicationDate: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      dateAccessed: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      title: new FormControl(null),
      book: new FormControl(null),
      link: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'submit',
      }),
    });
  }

  choosePublicationDate(event: MatDatepickerInputEvent<Date>) {
    this.min = event.value;
  }

  addReference() {
    const ref: Reference = {
      author: this.refForm.value.author as string,
      title: this.refForm.value.title as string,
      publicationDate: this.refForm.value.publicationDate as Date,
      dateAccessed: this.refForm.value.dateAccessed as Date,
      link: this.refForm.value.link as string,
    };
    console.log(ref);
    this.references.push(ref);

    this.refForm.reset();
    console.log(this.references);
  }
}
