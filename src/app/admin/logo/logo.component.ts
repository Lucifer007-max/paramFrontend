import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./logo.component.scss']
})
export default class logoComponent {
  aboutForm: any;
  imagePreview:any;
  wfile: File | any = null;
  List: any;
  loader: boolean = false;
  constructor(private FB: FormBuilder, private service: ApiService) { }

  ngOnInit(): void {
    this.logoGet()
    {
      this.aboutForm = this.FB.group({
        image: ['', Validators.required],
      })
    }
  }


  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      // console.log(this.wfile);

      // Generate an image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.wfile);
    }
  }

  submit() {
    this.loader = true;
    const payLoad = {
      "logoPath": this.wfile,
    }
    this.service.LogoService(payLoad).subscribe((res: any) => {
      console.log(res)
      if (res.status) {
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
        this.logoGet()
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }


  logoGet() {
    this.service.logoGet().subscribe((res => {
      this.List = res
    }))
  }

  handleDelete(id: number) {
    this.service.logoDelete(id).subscribe((res) => {
      // console.log(res)
      this.logoGet();
      this.service.SuccessSnackbar(res.message)
    })
  }
}
