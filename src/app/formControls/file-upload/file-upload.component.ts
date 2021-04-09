import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress: number;
  onChange: Function;
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  constructor(
    private host: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}
  writeValue(value: null): void {
    //clear
    this.host.nativeElement.value = '';
    this.file = null;
  }
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
}
