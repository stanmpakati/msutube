import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { UploadService } from '../../_services/upload.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  videoDetails!: { title: string; description: string; categories: string[] };
  tags: string[] = [];
  separatorKeyCodes = [ENTER, COMMA] as const;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    // Setup form
    this.detailsForm = new FormGroup({
      title: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
        updateOn: 'blur',
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      categories: new FormControl(null),
    });
  }

  get title() {
    return this.detailsForm.controls.title;
  }

  get description() {
    return this.detailsForm.controls.description;
  }

  get tagsForm() {
    return this.detailsForm.controls.tags;
  }

  add(event: MatChipInputEvent) {
    const val = (event.value || '').trim();

    if (val) {
      this.tags.push(val);
      event.chipInput?.clear();
    }
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) this.tags.splice(index, 1);
  }
}
