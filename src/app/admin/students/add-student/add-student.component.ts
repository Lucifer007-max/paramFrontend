import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, SharedModule,NgMultiSelectDropDownModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export default class AddStudentComponent  {
  dropdownList: any;
  selectedItems: any;
  dropdownSettings1: any;
  tags:any;
  gender:any;
  state:any;
  course:[] | any = [];
  validity:any
  studentForm:any = FormGroup;
  loader:boolean = false;
  studentList:any
  courseID:any
  courseList:any
  onedit:boolean = false;
  studentId:any;
  dob:any;
  // validity: string; // It can be string or number, depending on how you're handling it

  constructor(private _studentservice : StudentService,private service:ApiService, private FB : FormBuilder) {

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ngOnInit() {
    this.getCourse()
    this.loadStudent()
    {
      this.studentForm = this.FB.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        mobileno: ['', Validators.required],
        amount: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
      })
    }
  }


  onSelectAll(items: any) {
    console.log(items.id);
    this.course = items.map((item: any) => item.id);
    // console.log(this.tags);
  }

  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res)
    })
  }

  handleSelect(event:any  ,type:string){
    console.log(event.target.value , type)
    if(type == 'gender'){
      this.gender = event.target.value
    }else if(type == 'state'){
      this.state = event.target.value
    }else if (type == 'course'){
      this.course = event.target.value
      console.log(event.target.value)
    }else if(type == 'validity'){
      this.validity = event.target.value
    }
  }

  handleDelete(id:number){
    this._studentservice.studentDelete(id).subscribe((res:any) => {
      if(res.status){
        // this.getBanner()
        this.service.SuccessSnackbar(res.message)
        this.studentForm.reset();
        this.loadStudent();
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

  addStudent(){
    this.loader =  true;
    const payLoad = {
       "firstname":this.studentForm.value.firstName,
       "lastname":this.studentForm.value.lastName,
       "email":this.studentForm.value.email,
       "dob":this.studentForm.value.dob,
       "amount":this.studentForm.value.amount,
       "password":this.studentForm.value.password,
       "mobileno":this.studentForm.value.mobileno,
       "gender":this.gender,
       "state":this.state,
       "courseID":this.courseID,
       "validity": this.validity,
    }

    if(!this.onedit) {
      this._studentservice.addStudent(payLoad).subscribe((res:any) => {
        if(res.status){
          // this.getBanner()
          this.service.SuccessSnackbar(res.message)
          this.studentForm.reset();
          this.loadStudent();
          this.loader =  false;
        }else {
          this.service.SuccessSnackbar('something went wrong...!!')
          this.loader =  false;
        }
       }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      })
    } else if(this.onedit) {
      this.loader =  false;
      this._studentservice.updateStudent(payLoad ,this.studentId).subscribe((res:any) => {
        if(res.status){
          // this.getBanner()
          this.service.SuccessSnackbar(res.message)
          this.studentForm.reset();
          this.loadStudent();
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
  }


  loadStudent(){
    this._studentservice.getStudent().subscribe((res) => {
      this.studentList = res;
    })
  }

  handleCourse(e:any){
    this.courseID = e.target.value;
  }

  handleEdit(data: any,  $element: any): void {
    this.onedit = true;
    console.log(data.id)
    this.studentForm.get("firstName").setValue(data.firstname.trim().toString());
    this.studentForm.get("lastName").setValue(data.lastname.trim().toString());
    this.studentForm.get("dob").setValue(data.dob.trim().toString());
    this.studentForm.get("mobileno").setValue(parseInt(data.mobileno.trim().toString()));
    this.studentForm.get("amount").setValue(data.amount.trim().toString());
    this.studentForm.get("password").setValue(data.password.trim().toString());
    this.studentForm.get("email").setValue(data.email.trim().toString());
    this.validity = data.validity.trim().toString();
    this.courseID = data.courseID.trim().toString();
    this.gender = data.gender.trim().toString();
    this.state = data.state.trim().toString();
    // this.dob = data.dob
    // // Set the image URL by replacing the necessary parts of the path
    // this.imageUrl = `http://paramapi.getmocktest.com/${data.image.replace('wwwroot\\', '').replace(/\\/g, '/')}`;
    this.studentId = data.id
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
