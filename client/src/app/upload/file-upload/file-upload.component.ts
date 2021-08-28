import { Component, Inject, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { map } from 'rxjs/operators';

import { Upload } from 'src/app/_models/upload.interface';
import { imageMimeTypeValidator } from '../../_helpers/mine-type.validator';
import { UploadService } from 'src/app/_services/upload.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  uploadForm!: FormGroup;
  filePreview!: string | ArrayBuffer | null;
  draggedFile!: File;
  fileDropzoneActive: boolean = false;
  thumbDropzoneActive: boolean = false;
  uploadStatus!: Upload;
  fileName!: string;
  fileType!: string;
  readyForUpload: boolean = false;
  isSubmitted = false;
  fileTooBigError!: string;
  croppedImage!: string;
  showCropper = false;

  constructor(private UploadService: UploadService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [Validators.required]),
      thumbnail: new FormControl(null, {
        asyncValidators: [imageMimeTypeValidator],
      }),
    });

    this.uploadStatus = {
      percentage: 0,
      status: 'PENDING',
    };
    // this.fileName = 'oaifoewi weifowe iwenfow wiefno oe.mpS';
  }

  get file() {
    return this.uploadForm.controls.file;
  }

  get thumbnail() {
    return this.uploadForm.controls.thumbnail;
  }

  // To detect changes in the file drag zone
  fileDropzoneState($event: boolean) {
    this.fileDropzoneActive = $event;
  }

  // To detect changes in the thumbnail drag zone
  thumbDropzoneState($event: boolean) {
    this.thumbDropzoneActive = $event;
  }

  // To add the thumbnail to the form and preview
  // readThumbFile(file: File) {
  //   // Add file to form
  //   this.uploadForm.patchValue({ thumbnail: file });
  //   this.uploadForm.get('thumbnail')?.updateValueAndValidity();

  //   // Load with file reader
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.thumbPreview = reader.result as string;
  //   };

  //   reader.readAsDataURL(file);
  // }

  // To add the uploadfile to the form and preview
  readContentFile(file: File) {
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get('file')?.updateValueAndValidity();

    // update file name
    this.fileName = file.name;
    this.fileType = file.type;

    this.readyForUpload = true;

    // Load with file reader
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // To pick images
  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];
    // this.onThumbPick(file);
  }
  // ----------------------------------------------------------------

  // To pick images
  onThumbPick = async (event: Event) => {
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
    this.uploadForm.patchValue({ thumbnail: file });
    this.thumbnail.updateValueAndValidity();

    // Delay to give chance for angular to check if file is valid or not
    await new Promise((res) => setTimeout(res, 800));

    // Break function if there is an error
    if (this.thumbnail.errors) return;

    this.openCropDialog(event);
  };

  // To open the dialog to update the profile picture
  openCropDialog(event: any): void {
    const dialogRef = this.dialog.open(ThumbnailCropperDialog, {
      width: '450px',
      maxHeight: '650px',
      data: event,
    });

    // Register 1/1 cropped file
    dialogRef.afterClosed().subscribe((result) => {
      this.croppedImage = result;

      if (this.croppedImage) {
        const ppFile = base64ToFile(this.croppedImage);

        // Send file to form
        this.uploadForm.patchValue({ thumbnail: ppFile });
        this.thumbnail.updateValueAndValidity();
      }
    });
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: any) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }
  // -----------------------------------------------------------------------------

  // To pick file
  onFilePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement).files[0];
    this.readContentFile(file);
  }

  // To handle file drops in the dropzone
  handleDrop(fileList: FileList, fileNum: number) {
    console.log('dropped');

    if (fileNum === 0) this.readContentFile(fileList[0]);
    // else this.readThumbFile(fileList[0]);
  }

  // Fpload files
  uploadFiles() {
    this.isSubmitted = true;

    // Check Form Validation
    if (this.uploadForm.invalid) return;

    // Ask user to upload thumbnail
    if (!this.croppedImage && !this.fileType.includes('image')) {
      this.openDialog();
    } else {
      this.continueFileUpload();
    }
  }

  async openDialog() {
    const dialogRef = this.dialog.open(ThumbCheckDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.continueFileUpload();
    });
  }

  cancelUpload() {
    this.uploadStatus = { percentage: 0, status: 'PENDING' };
    this.fileName = '';
    this.fileType = '';
    this.readyForUpload = false;
    this.UploadService.uploadFalse();
  }

  // TODO implement deleting uploaded file
  deleteUpload() {
    this.uploadStatus = { percentage: 0, status: 'PENDING' };
    this.fileName = '';
    this.fileType = '';
    this.readyForUpload = false;
    this.UploadService.uploadFalse();
  }

  continueFileUpload() {
    this.UploadService.uploadVideo(
      this.uploadForm.value.thumbnail,
      this.uploadForm.value.file
    )
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadStatus.status = 'IN_PROGRESS';

            let uploadPcnt = Math.round(
              (100 / event.total! || 0) * event.loaded
            );
            this.uploadStatus.percentage = uploadPcnt;
          }
          if (event.type == HttpEventType.Response) {
            this.uploadStatus.status = 'DONE';
            const dets = { ...event.body! };
            // delete dets.message

            this.UploadService.recordFileDestDetails = dets;
          }
        })
      )
      .subscribe(
        () => {},
        (err) => {
          this.UploadService.uploadFalse();
          this.uploadStatus = { status: 'ERROR', percentage: 0 };
          console.log(err);
        }
      );
  }
}

/*
 * Calls Html file that contains dialogue
 */
@Component({
  selector: 'my-dialog',
  templateUrl: 'dialogue-prompt.html',
})
export class ThumbCheckDialog {
  uploadFile() {}
}

@Component({
  selector: 'thumbnail-cropper-dialog',
  templateUrl: 'thumbnail-cropper-dialog.component.html',
})
export class ThumbnailCropperDialog {
  croppedImage: any = '';

  constructor(
    public dialogRef: MatDialogRef<ThumbnailCropperDialog>,
    @Inject(MAT_DIALOG_DATA) public event: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
