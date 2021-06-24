import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/_models/post';
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
  dropzoneActive: boolean = false;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      file: new FormControl(null, [Validators.required]),
      thumbnail: new FormControl(null, {
        asyncValidators: [imageMimeTypeValidator],
      }),
    });
  }

  get thumbnail() {
    return this.uploadForm.controls.thumbnail;
  }

  // To detect changes in the file drag zone
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  // To add the thumbnail to the form and preview
  readThumbFile(file: File) {
    this.uploadForm.patchValue({ thumbnail: file });
    this.uploadForm.get('thumbnail')?.updateValueAndValidity();

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

    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };

    reader.readAsDataURL(file);

    // upload video
    const post: Post = {
      name: 'test video',
      filePath: '',
    };
    this.videoService.uploadVideo(
      post,
      this.uploadForm.value.thumbnail,
      this.uploadForm.value.file
    );
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
  handleDrop(fileList: FileList) {
    console.log('dropped');

    this.readThumbFile(fileList[0]);
  }
}
