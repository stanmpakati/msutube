import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Upload } from 'src/app/_models/upload.interface';
import { VideoService } from 'src/app/_services/video.service';
import { imageMimeTypeValidator } from '../../_helpers/mine-type.validator';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  uploadForm!: FormGroup;
  thumbPreview!: string | ArrayBuffer | null;
  filePreview!: string | ArrayBuffer | null;
  draggedFile!: File;
  fileDropzoneActive: boolean = false;
  thumbDropzoneActive: boolean = false;
  uploadStatus!: Upload;
  fileName!: string;

  constructor(private videoService: VideoService) {}

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
  readThumbFile(file: File) {
    // Add file to form
    this.uploadForm.patchValue({ thumbnail: file });
    this.uploadForm.get('thumbnail')?.updateValueAndValidity();

    // Load with file reader
    const reader = new FileReader();
    reader.onload = () => {
      this.thumbPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // To add the uploadfile to the form and preview
  readContentFile(file: File) {
    this.uploadForm.patchValue({ file: file });
    this.uploadForm.get('file')?.updateValueAndValidity();

    // update file name
    this.fileName = file.name;

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
    this.readThumbFile(file);
  }

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
    else this.readThumbFile(fileList[0]);
  }

  // Fpload files
  uploadFiles() {
    console.log('submit');
    // Check Form Validation
    if (this.uploadForm.invalid) return;

    this.videoService
      .uploadVideo(this.uploadForm.value.thumbnail, this.uploadForm.value.file)
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadStatus.status = 'IN_PROGRESS';

            let uploadPcnt = Math.round(
              (100 / event.total! || 0) * event.loaded
            );
            this.uploadStatus.percentage = uploadPcnt;
            console.log(this.uploadStatus.percentage);
          }
          if (event.type == HttpEventType.Response) {
            this.uploadStatus.status = 'DONE';
            console.log(event.body?.message);
          }
        })
      )
      .subscribe(
        () => {},
        (err) => {
          this.uploadStatus = { status: 'ERROR', percentage: 0 };
          console.log(err);
        }
      );
  }

  cancelUpload() {
    this.uploadStatus = { percentage: 0, status: 'PENDING' };
  }
}
