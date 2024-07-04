import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  formData: any = FormGroup;

  constructor(private API: ApiService, private FB: FormBuilder, private router:  Router) {
    var a = sessionStorage.getItem('token');
    if(a){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit(): void {
    {
      this.formData = this.FB.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      })
    }
  }

  handleLogin() {
    const JsonBody = {
      "email": this.formData.value.email,
      "password": this.formData.value.password,
    }
    this.API.adminAuth(JsonBody).subscribe((res: any) => {
      this.API.SuccessSnackbar(res.msg);
      sessionStorage.setItem('token' , res.token)
      this.router.navigate(['/dashboard'])
    },(err) => {
      this.API.ErrorSnackbar(err.message)
    })
  }
}
