import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApiService } from 'src/service/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, SharedModule, NgMultiSelectDropDownModule,AngularEditorModule],
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
  sloader: boolean = false;
  imageUrl: string = '';
  cId:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => {   }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
onedit:boolean = false
  constructor(private service: ApiService, private FB: FormBuilder) { }
  ngOnInit() {
    {
      this.courseForm = this.FB.group({
        courseName: ['', Validators.required],
        description: ['', Validators.required],
        courseImage:['',Validators.required]
      })
    }
    this.getCourse()

    this.dropdownList = [
      { "item_id": 1, "item_text": '11th Class' },
      { "item_id": 2, "item_text": '12th Class' },
      { "item_id": 3, "item_text": 'Repeter' },
      { "item_id": 4, "item_text": '8th Class' },
      { "item_id": 5, "item_text": '9th Class' },
      { "item_id": 6, "item_text": '10th Class' },
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
    // console.log(item.item_text);
    // Add the selected item's item_text to the tags array
    this.tags.push(item.item_text);
    // console.log(this.tags);
  }

  onSelectAll(items: any) {
    // console.log(items);
    this.tags = items.map((item: any) => item.item_text);
    // console.log(this.tags);
  }

  handleSubmit() {
    if(this.onedit) {
      this.sloader = true;
          const payLoad = {
            "id":this.cId,
              "title": this.courseForm.value.courseName,
              "image": this.wfile,
              "tag": this.tags,
              "description": this.courseForm.value.description
          }
          this.service.courseUpdate(payLoad ,this.cId).subscribe((res: any) => {
              if (res.status) {
                  this.getCourse();
                  this.courseForm.reset()
                  this.service.SuccessSnackbar(res.message);
              } else {
                  this.service.ErrorSnackbar('Something went wrong...!!');
              }
              this.sloader = false;
          }, (err) => {
              this.service.ErrorSnackbar(err.message);
              this.sloader = false;
          });
    }else{

      if (this.courseForm.valid) {
          this.sloader = true;
          const payLoad = {
              "title": this.courseForm.value.courseName,
              "image": this.wfile,
              "tag": this.tags,
              "description": this.courseForm.value.description
          }
          this.service.CourseService(payLoad).subscribe((res: any) => {
              if (res.status) {
                  this.getCourse();
                  this.courseForm.reset()
                  this.service.SuccessSnackbar(res.message);
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
        this.imageUrl = e.target.result;
        console.log('Image URLaaaa:', this.wfile);
        console.log('Image URL:', this.imageUrl);

        const img = new Image();
        img.onload = () => {
          if (this.onedit) {
            // For new uploads, store the File object
            this.wfile = this.imageUrl ;
            // When editing, use the base64 string for the image
            this.courseForm.patchValue({
              courseImage: this.imageUrl // Store the base64 string
            });
          } else {
            // For new uploads, store the File object
            this.wfile = file ;
            console.log('File object:', this.wfile);
            this.courseForm.patchValue({
              courseImage: this.wfile
            });
          }
          this.courseForm.get('courseImage')?.updateValueAndValidity();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }



  getCourse() {
    this.service.courseGet().subscribe((res: any) => {
      this.courseList = res;
      console.log(res.length)
    })
  }

  handleDelete(id:number){
    this.loader = true;
    this.service.courseDelete(id).subscribe((res) => {
      console.log(res)
      this.getCourse()
      this.service.SuccessSnackbar(res.message);
      this.loader = false;
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }

  handleEdit(data: any,  $element: any): void {
    this.onedit = true;
    console.log(data)
    this.courseForm.get("courseName").setValue(data.title.trim());
    this.courseForm.get("description").setValue(data.description.trim());
    // this.courseForm.get("courseImage").setValue(data.image);
    // this.selectedItems.push( data.tags.trim().toString())

    // Set the image URL by replacing the necessary parts of the path
    this.imageUrl = `http://paramapi.getmocktest.com/${data.image.replace('wwwroot\\', '').replace(/\\/g, '/')}`;
    console.log(this.imageUrl)
    this.cId =data.id
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


}


