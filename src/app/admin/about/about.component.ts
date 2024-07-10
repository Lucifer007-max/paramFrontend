import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule ],
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  aboutForm:any;



  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 100 * 1024) { // Size validation: 100KB
        // this.service.ErrorSnackbar('File size exceeds 100KB');
        console.error("File size exceeds 100KB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // if (img.width !== 300 || img.height !== 300) {
          //   this.service.ErrorSnackbar('Image dimensions are not 300x300 pixels');
          //   console.error("Image dimensions are not 300x300 pixels");
          //   return;
          // } else {
            // this.wfile = file;
            // console.log(this.wfile);
            // this.courseForm.patchValue({
            //   courseImage: file
            // });
            // this.courseForm.get('courseImage')?.updateValueAndValidity();
          // }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
