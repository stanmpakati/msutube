import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: any
    // type: string = 'url'
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    // switch (type) {
    //   case 'html':
    //     return this.sanitizer.bypassSecurityTrustHtml(value);
    //   case 'style':
    //     return this.sanitizer.bypassSecurityTrustStyle(value);
    //   case 'script':
    //     return this.sanitizer.bypassSecurityTrustScript(value);
    //   case 'url':
    //     return this.sanitizer.bypassSecurityTrustUrl(value);
    //   case 'resourceUrl':
    //     return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    //   default:
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    // throw new Error(`Unable to bypass security for invalid type: ${type}`);
    // }
  }
}
