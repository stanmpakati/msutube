import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { Reference } from 'src/app/_models/reference.interface';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-references-form',
  templateUrl: './references-form.component.html',
  styleUrls: ['./references-form.component.scss'],
})
export class ReferencesFormComponent implements OnInit {
  refForm!: FormGroup;
  authors: string[] = [];
  references: Reference[] = [];
  today = new Date();
  min!: Date | null;
  separatorKeyCodes = [ENTER, COMMA] as const;

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
      title: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      book: new FormControl(null),
      link: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'submit',
      }),
    });
  }

  add(event: MatChipInputEvent) {
    const val = (event.value || '').trim();

    if (val) {
      this.authors.push(val);
      event.chipInput?.clear();
    }
  }

  remove(tag: string) {
    const index = this.authors.indexOf(tag);

    if (index >= 0) this.authors.splice(index, 1);
  }

  choosePublicationDate(event: MatDatepickerInputEvent<Date>) {
    this.min = event.value;
  }

  addReference() {
    if (this.refForm.invalid) return;

    const ref: Reference = {
      author: this.authors,
      refTitle: this.refForm.value.title as string,
      publicationDate: this.refForm.value.publicationDate as Date,
      dateAccessed: this.refForm.value.dateAccessed as Date,
      link: this.refForm.value.link as string,
    };
    this.references.push(ref);

    this.authors = [];
    this.refForm.reset();
    console.log(this.references);
  }
}
