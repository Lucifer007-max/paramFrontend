import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./testimonial.component.scss']
})
export default class TestimonialComponent {
  testimonialForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  testimonialList:any;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getTestimonial();
   }


  ngOnInit() {
    {
      this.testimonialForm = this.FB.group({
        testTitle: ['', Validators.required],
        testTag: ['', Validators.required],
        testDescription: ['', Validators.required],
        testImage: ['', Validators.required]
      })
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 100 * 1024) { // Size validation: 100KB
        this.service.ErrorSnackbar('File size exceeds 100KB');
        console.error("File size exceeds 100KB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          // if (img.width !== 100 || img.height !== 100) {
          //   this.service.ErrorSnackbar('Image dimensions are not 50x50 pixels');
          //   console.error("Image dimensions are not 50x50 pixels");
          //   return;
          // } else {
            this.wfile = file;
            console.log(this.wfile);
            this.testimonialForm.patchValue({
              testImage: file
            });
            this.testimonialForm.get('testImage')?.updateValueAndValidity();
          // }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  handleSubmit() {
    if (this.testimonialForm.valid) {
      this.loader = true;
      const payLoad = {
        "title": this.testimonialForm.value.testTitle,
        "image": this.wfile,
        "tag": this.testimonialForm.value.testTag,
        "description": this.testimonialForm.value.testDescription
      }
      this.service.TestimonialService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getTestimonial();
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }

  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
    });
  }
  handleDelete(id:number){
    this.service.testimonialDelete(id).subscribe((res) => {
      // console.log(res)
      this.getTestimonial()
      this.service.SuccessSnackbar(res.message);
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }

}
