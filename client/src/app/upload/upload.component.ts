import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { UploadService } from '../_services/upload.service';
import { Post } from '../_models/post';
import { User } from '../_models/user';
import { Contributer } from '../_models/contributer';
import { UserService } from '../_services/user.service';
import { debounceTime, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  // Upload form
  uploadForm!: FormGroup;
  imagePreview!: string | ArrayBuffer | null;
  draggedFile!: File;
  dropzoneActive: boolean = false;
  //details form
  detailsForm!: FormGroup;
  videoDetails!: { title: string; description: string; categories: string[] };
  tags: string[] = [];
  separatorKeyCodes = [ENTER, COMMA] as const;
  // Contributers form
  contributesForm!: FormGroup;
  partners: User[] = [];
  contributers!: Contributer[];
  // Links form
  linksForm!: FormGroup;

  constructor(
    private uploadService: UploadService,
    private userService: UserService
  ) {}

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

  saveFiles(files: FileList) {
    if (files.length > 1) return;
    else {
      console.log(files[0].size, files[0].name, files[0].type);

      const mimeType = files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        // image error
        return;
      }

      var reader = new FileReader();
      // this.imagePreview = files[0];

      this.draggedFile = files[0];
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imagePreview = reader.result;
      };

      // update form validation
      this.uploadForm.patchValue({ file: files[0] });
      this.uploadForm.get('file')?.updateValueAndValidity();
      console.log(files[0]);
    }
  }

  // details -------------------------------------------------
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

  // Contributers
  removeContributer(contributer: Contributer) {
    const index = this.contributers.indexOf(contributer);

    if (index >= 0) this.contributers.splice(index, 1);
  }

  addPartner(event: MatChipInputEvent) {
    const val = (event.value || '').trim();

    if (val) {
      this.userService.findUser(val).pipe(
        debounceTime(1000),
        take(1),
        map((res) => {
          if (res.message === 'User found') {
            this.partners.push(res.user);
            event.chipInput?.clear();
          }
        })
      );
    }
  }
}
