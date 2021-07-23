import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-references-form',
  templateUrl: './references-form.component.html',
  styleUrls: ['./references-form.component.scss'],
})
export class ReferencesFormComponent implements OnInit {
  refForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const urlRegex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.refForm = new FormGroup({
      author: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'blur',
      }),
      publicationDate: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'blur',
      }),
      dateAccessed: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'blur',
      }),
      title: new FormControl(null),
      book: new FormControl(null),
      link: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(urlRegex)],
        updateOn: 'blur',
      }),
    });
  }
}
