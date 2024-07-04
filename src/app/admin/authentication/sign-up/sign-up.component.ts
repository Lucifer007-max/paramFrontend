import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {
  formData: any = FormGroup;

  constructor(private API: ApiService, private FB: FormBuilder, private router:  Router) { }

  ngOnInit(): void {
    {
      this.formData = this.FB.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
      })
    }
  }

  handleSubmit() {
    const JsonBody = {
      "firstName": this.formData.value.username,
      "email": this.formData.value.email,
      "mobileNo": this.formData.value.phone,
      "password": this.formData.value.password,
    }
    this.API.register(JsonBody).subscribe((res: any) => {
      this.API.SuccessSnackbar(res.message);
      this.router.navigate(['auth/signin'])
    },(err) => {
      this.API.ErrorSnackbar(err.message)
    })
  }
}
