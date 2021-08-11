import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from '../_helpers/file-drop.directive';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [FileDropDirective],
  exports: [CommonModule, FileDropDirective, ImageCropperModule],
})
export class SharedModule {}
