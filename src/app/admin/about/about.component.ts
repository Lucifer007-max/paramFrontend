import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  aboutForm: any;
  wfile: File | any = null;
  List: any;
  loader: boolean = false;
  constructor(private FB: FormBuilder, private service: ApiService) { }

  ngOnInit(): void {
    this.getAbout()
    {
      this.aboutForm = this.FB.group({
        title: ['', Validators.required],
        image: ['', Validators.required],
      })
    }
  }


  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log(this.wfile)
    }
  }

  submit() {
    this.loader = true;
    const payLoad = {
      "title": this.aboutForm.value.title,
      "image": this.wfile,
    }
    this.service.AboutService(payLoad).subscribe((res: any) => {
      if (res.status) {
        // this.getBanner()
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }


  getAbout() {
    this.service.aboutGet().subscribe((res => {
      this.List = res
    }))
  }

  handleDelete(id: number) {
    this.service.aboutDelete(id).subscribe((res) => {
      // console.log(res)
      this.getAbout();
      this.service.SuccessSnackbar(res.message)
    })
  }
}
