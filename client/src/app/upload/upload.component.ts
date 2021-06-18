import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { UploadService } from '../_services/upload.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  // Upload form
  uploadForm!: FormGroup;
  imagePreview!: string;
  dropzoneActive: boolean = false;
  //details form
  detailsForm!: FormGroup;
  videoDetails!: { title: string; description: string; categories: string[] };
  tags: string[] = [];
  separatorKeyCodes = [ENTER, COMMA] as const;
  // Contributers form
  contributesForm!: FormGroup;
  partners: string[] = [];
  // Links form
  linksForm!: FormGroup;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [Validators.required]),
      thumbnail: new FormControl(null),
    });
    this.detailsForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      categories: new FormControl(null),
    });
    this.contributesForm = new FormGroup({
      partners: new FormControl(),
    });
  }

  get title() {
    return this.detailsForm.controls.title;
  }

  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);

    //TODO remove this
    const post: Post = {
      name: 'vid',
      filePath: '',
    };

    this.uploadService.uploadVideo(post, this.uploadForm.value.file);
  }

  handleDrop(fileList: FileList) {
    console.log('dropped');
    let filesIndex = _.range(fileList.length);

    this.uploadForm.patchValue({ file: fileList.item });
    this.uploadForm.get('file')?.updateValueAndValidity();

    _.each(filesIndex, (idx) => {
      const post: Post = {
        name: 'vid',
        filePath: '',
      };

      this.uploadService.uploadVideo(post, this.uploadForm.value.file);
    });
  }

  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
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
    console.log('clicked');
    if (this.detailsForm.invalid) return;

    // this.
  }
}
