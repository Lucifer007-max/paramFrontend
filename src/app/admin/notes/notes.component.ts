import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export default class NotesComponent {
  wfile: File | any = null;
  loader: boolean = false;
  testimonialList:any;
  NotesForm:any;
  NotesList:any
  courseList:any;
  validFiles: File[] = [];
  courseID:any
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.notesGet();
    this.getCourse();
   }


  ngOnInit() {
    {
      this.NotesForm = this.FB.group({
        desc: ['', Validators.required],
        image: ['', Validators.required],
        price: ['', Validators.required],
        title: ['', Validators.required],
      })
    }
  }

  handleDelete(id:number){
    this.service.notesDelete(id).subscribe((res:any) => {
      // console.log(res)
      this.notesGet()
      this.service.SuccessSnackbar(res.message);
      } ,(err:any) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
    })
  }

  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res.length)
    })
  }
  handleCourse(e:any){
    this.courseID = e.target.value;

  }


  handleSubmit() {
    // if (this.NotesForm.valid) {
      this.loader = true;
      const payLoad = {
        "courseId":this.courseID,
        "images": this.validFiles,
        "price": this.NotesForm.value.price,
        "desc": this.NotesForm.value.desc,
        "title": this.NotesForm.value.title,

      }
      this.service.NotesService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.NotesForm.reset()
          this.notesGet()
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      });
    // } else {
    //   this.service.ErrorSnackbar('Form is invalid');
    // }
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
        const base64Data = e.target.result.split(',')[1]; // Get Base64 string from Data URL
        const img = new Image();
        img.onload = () => {
          // Optional: Validate dimensions if needed
          // if (img.width !== 50 || img.height !== 50) {
          //   this.service.ErrorSnackbar('Image dimensions are not 50x50 pixels');
          //   console.error("Image dimensions are not 50x50 pixels");
          //   return;
          // }

          // If validation passes, store Base64 string
          this.validFiles.push(base64Data);
          this.NotesForm.patchValue({
            testImage: base64Data // Update the form with Base64 string
          });
          this.NotesForm.get('images')?.updateValueAndValidity();

          console.log('Base64 File:', base64Data);
        };
        img.src = e.target.result; // Set source to Data URL
      };
      reader.readAsDataURL(file); // Read file as Base64 Data URL
    }
  }





  notesGet(){
    this.service.notesGet().subscribe((res:any) => {
      this.NotesList = res
    })
  }
}
