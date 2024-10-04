import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  loginForm:any;
  loader: boolean = false;
 constructor (private service : AuthService,private _service :ApiService, private _FB : FormBuilder , private router: Router) {
  {
    this.loginForm = this._FB.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
 }



 login(){
  this.loader = true;
  const payload = {
    "email":this.loginForm.value.email,
    "password":this.loginForm.value.password,
    "role":'user',
    "studentID": "",
  }
  this.service.studentLogin(payload).subscribe((res) => {
    console.log(res)
    this.loader = false;
    sessionStorage.setItem('token' , res.token)
    sessionStorage.setItem('courseid' , res.studentData.courseID)
    sessionStorage.setItem('student' , JSON.stringify(res.studentData))
    // sessionStorage.setItem('courseid' , res)
    this._service.SuccessSnackbar('Login Successful..!');
    this.router.navigate(['/student/dashboard'])
  }, (err) => {
    this.loader = false;
    this._service.ErrorSnackbar(err.message);
    // this.loader = false;
  })
 }
}
