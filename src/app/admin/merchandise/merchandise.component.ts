import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./merchandise.component.scss']
})
export default class MerchandiseComponent {
  wfile: File | any = null;
  loader: boolean = false;
  testimonialList:any;
  merchandiesForm:any;
  merchandiesList:any
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.merchandesGet();
   }


  ngOnInit() {
    {
      this.merchandiesForm = this.FB.group({
        title: ['', Validators.required],
        image: ['', Validators.required],
        price: ['', Validators.required],
      })
    }
  }

  handleDelete(id:number){
    this.service.merchandiesDelete(id).subscribe((res) => {
      // console.log(res)
      this.merchandesGet()
      this.service.SuccessSnackbar(res.message);
      } ,(err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
    })
  }



  handleSubmit() {
    if (this.merchandiesForm.valid) {
      this.loader = true;
      const payLoad = {
        "title": this.merchandiesForm.value.title,
        "image": this.wfile,
        "price": this.merchandiesForm.value.price,
      }
      this.service.MerchandiesService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.merchandiesForm.reset()
          this.merchandesGet()
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
            this.merchandiesForm.patchValue({
              testImage: file
            });
            this.merchandiesForm.get('testImage')?.updateValueAndValidity();
          // }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  merchandesGet(){
    this.service.merchandesGet().subscribe((res:any) => {
      this.merchandiesList = res
    })
  }
}
