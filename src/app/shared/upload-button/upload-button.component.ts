import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);
  }

}
