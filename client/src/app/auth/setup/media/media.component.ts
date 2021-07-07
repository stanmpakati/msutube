import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  croppedImage: any = '';
  imageChangedEvent!: any;
  showCropper = false;

  constructor() {}

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

    this.readProfPick(fileList[0]);
  }

  // To pick images
  onImagePicked(event: Event) {
    // @ts-ignore: Object is possibly 'null'.
    // const file = (event.target as HTMLInputElement).files[0];
    // this.readProfPick(file);

    this.imageChangedEvent = event;
  }

  // To add the profilePic to the form and preview
  readProfPick(file: File) {
    // Add file to form
    this.uploadForm.patchValue({ profilePic: file });
    this.uploadForm.get('profilePic')?.updateValueAndValidity();

    // Load with file reader
    const reader = new FileReader();
    reader.onload = () => {
      this.picPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
