import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';

import { UploadService } from '../../_services/upload.service';
import { Post } from '../../_models/post';

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
    this.detailsForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      categories: new FormControl(null),
    });
  }

  get title() {
    return this.detailsForm.controls.title;
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

  next() {
    console.log(this.title.errors);
    if (this.detailsForm.invalid) return;
    console.log('clicked');

    const post: Post = {
      filePath: '',
      name: 'testfile',
    };
    // this.uploadService.uploadVideo(post, this.uploadForm.value.file);
  }
}
