import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  constructor(private _studentservice : StudentService,private service:ApiService, private FB : FormBuilder) {
    // this.dropdownList = [
    //   { "item_id": 1, "item_text": '11th Class' },
    //   { "item_id": 2, "item_text": '12th Class' },
    //   { "item_id": 3, "item_text": 'Dropper' },
    //   { "item_id": 4, "item_text": '8th Class' },
    //   { "item_id": 5, "item_text": '9th Class' },
    //   { "item_id": 6, "item_text": '10th Class' },
    // ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      // selectAllText: 'Select All',
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
      })
    }
  }

  onItemSelect(item: any) {
    console.log(item.id);
    // Add the selected item's item_text to the tags array
    this.course.push(item.id);
    // console.log(this.tags);
  }

  onSelectAll(items: any) {
    console.log(items.id);
    this.course = items.map((item: any) => item.id);
    // console.log(this.tags);
  }

  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.dropdownList = res;
      console.log(res)
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

  }

  addStudent(){
    this.loader =  true;
    const payLoad = {
       "firstname":this.studentForm.value.firstName,
       "lastname":this.studentForm.value.lastName,
       "dob":this.studentForm.value.dob,
       "amount":this.studentForm.value.amount,
       "password":this.studentForm.value.password,
       "mobileno":this.studentForm.value.mobileno,
       "gender":this.gender,
       "state":this.state,
       "courseID":this.course,
       "validity": this.validity,
    }
    this._studentservice.addStudent(payLoad).subscribe((res:any) => {
      if(res.status){
        // this.getBanner()
        this.service.SuccessSnackbar(res.message)
        this.studentForm.reset();
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


  loadStudent(){
    this._studentservice.getStudent().subscribe((res) => {
      this.studentList = res;
      // console.log(res)
    })
  }
}
