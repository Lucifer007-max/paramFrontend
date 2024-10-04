import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-testseries',
  standalone: true,
  imports: [CommonModule, SharedModule ,AngularEditorModule],
  templateUrl: './testseries.component.html',
  styleUrls: ['./testseries.component.scss']
})
export default class TestseriesComponent {
  lectureForm:any;
  courseList:any;
  courseID:any;
  sloader:any;
  lecturesList:any;
  ID:any;
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
  onedit:boolean = false;
  constructor(private service: ApiService, private FB: FormBuilder) {
    // this.notesGet();
    this.getCourse();
    this.testGet()
   }

   ngOnInit() {
    this.lectureForm = this.FB.group({
      courseName: ['', Validators.required],
      description: this.FB.array([this.createDescription()]) // Initialize with one description
    });
  }

  createDescription(): FormGroup {
    return this.FB.group({
      description: ['', Validators.required]
    });
  }

  get description(): FormArray {
    return this.lectureForm.get('description') as FormArray;
  }

  addDescription() {
    this.description.push(this.createDescription());
  }

  removeDescription(index: number) {
    if (this.description.length > 1) {
      this.description.removeAt(index);
    }
  }

  handleSubmit() {
    if (this.lectureForm.valid) {
      this.sloader = true;

      const payload = {
        courseId: this.lectureForm.value.courseName,
        description: this.lectureForm.value.description.map((desc: any) => desc.description)
      };
      if(this.onedit){
        this.service.TestServiceUpdate(payload, this.ID).subscribe(
          (res: any) => {
            if (res.status) {
              this.service.SuccessSnackbar(res.message);
              this.lectureForm.reset();
              this.testGet()
            } else {
              this.service.ErrorSnackbar('Something went wrong...!!');
            }
            this.sloader = false;
          },
          (err) => {
            this.service.ErrorSnackbar(err.message);
            this.sloader = false;
          }
        );
      }else {

        this.service.TestService(payload).subscribe(
          (res: any) => {
            if (res.status) {
              this.service.SuccessSnackbar(res.message);
              this.lectureForm.reset();
              this.testGet()
            } else {
              this.service.ErrorSnackbar('Something went wrong...!!');
            }
            this.sloader = false;
          },
          (err) => {
            this.service.ErrorSnackbar(err.message);
            this.sloader = false;
          }
        );
      }
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }
  handleDelete(id:number){
    this.service.testDelete(id).subscribe((res:any) => {
      // console.log(res)
      this.testGet()
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
  testGet() {
    this.service.testGet().subscribe((res: any) => {
      console.log(res)
      this.lecturesList = res;
    })
  }
  handleCourse(e:any){
    this.courseID = e.target.value;

  }


  handleEdit(data: any,  $element: any): void {
    this.onedit = true
    this.ID = data.id
    this.lectureForm.get("courseName").setValue(data.courseId);

    this.description.clear();

    const descriptions = data.description ? data.description.split(',') : [];

    descriptions.forEach((desc:any) => {
      this.description.push(this.FB.group({
        description: [desc.trim(), Validators.required]
      }));
    });

    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
