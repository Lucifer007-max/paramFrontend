import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, SharedModule, NgMultiSelectDropDownModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export default class AddCourseComponent {
  courseForm: any;
  dropdownList: any;
  selectedItems: any;
  dropdownSettings: any;
  wfile: File | any = null;
  tags:[] | any = [];
  courseList: any;
  loader: boolean = false;
  constructor(private service: ApiService, private FB: FormBuilder) { }
  ngOnInit() {
    {
      this.courseForm = this.FB.group({
        courseName: ['', Validators.required],
        description: ['', Validators.required],
        courseImage:['',Validators.required]
      })
    }

    this.dropdownList = [
      { "item_id": 1, "item_text": '11th Class' },
      { "item_id": 2, "item_text": '12th Class' },
      { "item_id": 3, "item_text": 'Dropper' },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // this.getCourse()
  }
  onItemSelect(item: any) {
    console.log(item.item_text);
    // Add the selected item's item_text to the tags array
    this.tags.push(item.item_text);
    console.log(this.tags);
  }

  onSelectAll(items: any) {
    console.log(items);
    this.tags = items.map((item: any) => item.item_text);
    console.log(this.tags);
  }

  handleSubmit() {
    if (this.courseForm.valid) {
        this.loader = true;
        const payLoad = {
            "title": this.courseForm.value.courseName,
            "image": this.wfile,
            "tag": this.tags,
            "description": this.courseForm.value.description
        }
        this.service.CourseService(payLoad).subscribe((res: any) => {
            if (res.status) {
                this.getCourse();
                this.service.SuccessSnackbar(res.message);
            } else {
                this.service.ErrorSnackbar('Something went wrong...!!');
            }
            this.loader = false;
        }, (err) => {
            this.service.ErrorSnackbar(err.message);
            this.loader = false;
        });
    } else {
        this.service.ErrorSnackbar('Form is invalid');
    }
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
        const img = new Image();
        img.onload = () => {
          // if (img.width !== 300 || img.height !== 300) {
          //   this.service.ErrorSnackbar('Image dimensions are not 300x300 pixels');
          //   console.error("Image dimensions are not 300x300 pixels");
          //   return;
          // } else {
            this.wfile = file;
            console.log(this.wfile);
            this.courseForm.patchValue({
              courseImage: file
            });
            this.courseForm.get('courseImage')?.updateValueAndValidity();
          // }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
      // console.log(res.length)
    })
  }

  handleDelete(id:number){
    this.service.courseDelete(id).subscribe((res) => {
      // console.log(res)
      this.service.SuccessSnackbar(res.message);
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }
}


