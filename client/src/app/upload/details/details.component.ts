import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { UploadService } from '../../_services/upload.service';
import { Post } from '../../_models/post';
import { MatDialog } from '@angular/material/dialog';
import { NoFileDialogComponent } from 'src/app/components/no-file-dialog/no-file-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  detailsForm!: FormGroup;
  videoDetails!: { title: string; description: string; categories: string[] };
  tags: string[] = [];
  separatorKeyCodes = [ENTER, COMMA] as const;
  fileUploading!: boolean;
  ifFileUploadingListener = new Subscription();
  notUploadingError = '';

  constructor(
    private uploadService: UploadService,
    private dialog: MatDialog
  ) {}

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
    // listen for file upload changes
    this.ifFileUploadingListener = this.uploadService.isFileUploading.subscribe(
      (isUploading) => (this.fileUploading = isUploading)
    );
    console.log('uploading' + this.fileUploading);
  }

  ngOnDestroy() {
    this.ifFileUploadingListener.unsubscribe();
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

  next() {
    console.log(this.title.errors);
    console.log('details file upload ' + this.fileUploading);
    // Throw error if there is no file uploading
    if (!this.fileUploading) {
      const dialogRef = this.dialog.open(NoFileDialogComponent);

      dialogRef.afterClosed().subscribe();
    }

    if (this.detailsForm.invalid) return;
    console.log('clicked');

    const post: Post = {
      filePath: '',
      name: 'testfile',
    };
    // this.uploadService.uploadVideo(post, this.uploadForm.value.file);
  }
}
