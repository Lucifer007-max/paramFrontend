import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-banner',
  standalone:true,
  imports: [CommonModule, SharedModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export default class BannerComponent {
  bannerForm: any = FormGroup;
  wfile: File | any = null;
  bannerList:any;
  loader:boolean = false;
  constructor(private FB: FormBuilder, private service:ApiService) { }

  ngOnInit(): void {
    this.getBanner()
    {
      this.bannerForm = this.FB.group({
        bannerTitle: ['', Validators.required],
        bannerImage: ['', Validators.required],
      })
    }
  }
  onFileSelect(event: any){
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log( this.wfile)
    }
  }

  addBanner(){
  this.loader =  true;
   const payLoad = {
      "title":this.bannerForm.value.bannerTitle,
      "image":this.wfile,
   }
   this.service.bannerService(payLoad).subscribe((res:any) => {
    if(res.status){
      this.getBanner()
      this.service.SuccessSnackbar(res.message)
      this.loader =  false;
    }else {
      this.service.SuccessSnackbar('something went wrong...!!')
      this.loader =  false;
    }
   }, (err) => {
    this.service.ErrorSnackbar(err.message);
    this.loader = false;
})
  }

  getBanner(){
    this.service.bannerGet().subscribe((res:any)=> {
      this.bannerList = res;
      console.log(res)
    })
  }

  handleDelete(id:number){
    this.service.bannerDelete(id).subscribe((res) => {
      console.log(res)
      this.getBanner();
      this.service.SuccessSnackbar(res.message)
    })
  }
}
