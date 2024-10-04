import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-online-lectures',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './online-lectures.component.html',
  styleUrls: ['./online-lectures.component.scss']
})
export default class OnlineLecturesComponent {
  lectureForm:any;
  courseList:any;
  courseID:any;
  sloader:any;
  lecturesList:any;
  onedit:boolean =false;
  constructor(private service: ApiService, private FB: FormBuilder) {
    // this.notesGet();
    this.getCourse();
this.lecturesGet()
   }

   ngOnInit() {
    this.lectureForm = this.FB.group({
      courseName: ['', Validators.required],
      lectureLinks: this.FB.array([this.createLectureLink()]), // Initialize with one lecture link
      description: ['', Validators.required],
      amount:['', Validators.required],
    });
  }

  createLectureLink(): FormGroup {
    return this.FB.group({
      letureLink: ['', Validators.required]
    });
  }

  get lectureLinks(): FormArray {
    return this.lectureForm.get('lectureLinks') as FormArray;
  }

  addLectureLink() {
    this.lectureLinks.push(this.createLectureLink());
  }

  removeLectureLink(index: number) {
    this.lectureLinks.removeAt(index);
  }

  handleSubmit() {
    if (this.lectureForm.valid) {
      this.sloader = true;

      // Prepare the payload
      const payLoad = {
        courseId: this.lectureForm.value.courseName, // Assuming `courseName` holds the selected course ID
        lectureLinks: this.lectureForm.value.lectureLinks.map((link: any) => link.letureLink), // Extract lecture links from the FormArray
        description: this.lectureForm.value.description,
        amount: this.lectureForm.value.amount,
        // Add other data as required
      };

      // Call the service to submit the form
      this.service.LecturesService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.lectureForm.reset();
          // this.notesGet(); // Assuming this method refreshes the notes
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.sloader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.sloader = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }
  handleDelete(id:number){
    this.service.lecturesDelete(id).subscribe((res:any) => {
      // console.log(res)
      this.lecturesGet()
      this.service.SuccessSnackbar(res.message);
      } ,(err:any) => {
        this.service.ErrorSnackbar(err.message);
        // this.loader = false;
    })
  }


  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res.length)
    })
  }
  lecturesGet() {
    this.service.lecturesGet().subscribe((res: any) => {
      this.lecturesList = res;
      // console.log(res.length)
    })
  }
  handleCourse(e:any){
    this.courseID = e.target.value;

  }



  handleEdit(data: any,  $element: any): void {
    this.onedit = true
    this.lectureForm.get("courseName").setValue(data.courseId);
    this.lectureForm.get("amount").setValue(data.price);
    this.lectureForm.get("description").setValue(data.desc);

    const lectureLinks = data.lectureLink ? data.lectureLink.split(',') : [];
    lectureLinks.forEach((link: any) => {
      this.lectureLinks.push(this.FB.group({
        letureLink: [link.trim(), Validators.required]
      }));
    });
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }


}
