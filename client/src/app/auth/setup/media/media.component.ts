import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { imageMimeTypeValidator } from 'src/app/_helpers/mine-type.validator';
import { Upload } from 'src/app/_models/upload.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  @Output() uploadProfilePicture: EventEmitter<{}> = new EventEmitter();
  uploadForm!: FormGroup;
  fileDropzoneActive = false;
  uploadStatus!: Upload;
  picPreview!: string;
  croppedImage: any;
  imageChangedEvent!: any;
  showCropper = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      profilePic: new FormControl(null, {
        asyncValidators: [imageMimeTypeValidator],
      }),
    });

    this.uploadStatus = {
      percentage: 0,
      status: 'PENDING',
    };

    console.log('app-media');
  }

  get profilePic() {
    return this.uploadForm.controls.profilePic;
  }

  // To detect changes in the file drag zone
  fileDropzoneState($event: boolean) {
    this.fileDropzoneActive = $event;
  }

  // To handle file drops in the dropzone
  handleDrop(fileList: FileList) {
    console.log('dropped');

    // this.onImagePicked(fileList[0]);
  }

  // To pick images
  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];

    // Add file to form
    this.uploadForm.patchValue({ profilePic: file });
    this.uploadForm.get('profilePic')?.updateValueAndValidity();

    if (this.profilePic.errors) return;

    console.log('No errors yey');
    this.openDialog(event);
  }

  // To open the dialog to update the profile picture
  openDialog(event: any): void {
    const dialogRef = this.dialog.open(ImageCropperDialog, {
      width: '450px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.croppedImage = result;
    });
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: any) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  uploadFile() {}
}

@Component({
  selector: 'image-cropper-dialog',
  templateUrl: 'image-cropper-dialog.component.html',
})
export class ImageCropperDialog {
  croppedImage: any = '';

  constructor(
    public dialogRef: MatDialogRef<ImageCropperDialog>,
    @Inject(MAT_DIALOG_DATA) public event: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
