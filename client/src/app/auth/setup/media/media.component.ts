import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  imageMimeTypeValidator,
  imageSizeValidator,
} from 'src/app/_helpers/mine-type.validator';
import { Upload } from 'src/app/_models/upload.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  @Output() uploadProfilePicture: EventEmitter<File> = new EventEmitter();
  uploadForm!: FormGroup;
  fileDropzoneActive = false;
  uploadStatus!: Upload;
  picPreview!: string;
  croppedImage!: string;
  imageChangedEvent!: any;
  showCropper = false;
  fileTooBigError!: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      profilePic: new FormControl(null, {
        validators: [imageSizeValidator],
        asyncValidators: [imageMimeTypeValidator],
      }),
    });

    this.uploadStatus = {
      percentage: 0,
      status: 'PENDING',
    };
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
  onImagePicked = async (event: Event) => {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];

    // Check if file is greater than 1mb and reject it
    const size = file.size;
    if (size >= 1024000) {
      this.fileTooBigError = 'Sorry Your file is too big';
      return;
    }

    // reset file size error
    this.fileTooBigError = '';

    // Add file to form
    this.uploadForm.patchValue({ profilePic: file });
    this.profilePic.updateValueAndValidity();

    // Delay to give chance for angular to check if file is valid or not
    await new Promise((res) => setTimeout(res, 800));

    // Break function if there is an error
    if (this.profilePic.errors) return;

    this.openDialog(event);
  };

  // To open the dialog to update the profile picture
  openDialog(event: any): void {
    const dialogRef = this.dialog.open(ImageCropperDialog, {
      width: '450px',
      maxHeight: '600px',
      data: event,
    });

    // Register 1/1 cropped file
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

  uploadFile() {
    this.uploadProfilePicture.emit(this.uploadForm.value.prifilePic);
  }
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
