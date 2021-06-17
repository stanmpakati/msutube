import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploadForm!: FormGroup;
  imagePreview!: string;
  detailsForm!: FormGroup;
  contributesForm!: FormGroup;
  linksForm!: FormGroup;
  videoDetails!: { title: string; description: string; categories: string[] };

  constructor() {}

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

  next() {
    console.log('clicked');
    if (this.detailsForm.invalid) return;

    // this.
  }

  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
