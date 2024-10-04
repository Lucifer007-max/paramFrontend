import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-blog',
  standalone:true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export default class BlogComponent {
  blogForm: any = FormGroup;
  wfile: File | any = null;
  blogList:any;
  loader:boolean = false;
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
  constructor(private FB: FormBuilder, private service:ApiService) { }

  ngOnInit(): void {
    this.getBlog()
    {
      this.blogForm = this.FB.group({
        blogtitle: ['', Validators.required],
        blogimage: ['', Validators.required],
        blogDate: ['', Validators.required],
        blogdescription: ['', Validators.required],
      })
    }
  }
  onFileSelect(event: any){
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log( this.wfile)
    }
  }

  addBanner(){
  this.loader =  true;
   const payLoad = {
      "title":this.blogForm.value.blogtitle,
      "description":this.blogForm.value.blogdescription,
      "date":this.blogForm.value.blogDate,
      "image":this.wfile,
   }
   this.service.blogService(payLoad).subscribe((res:any) => {
    if(res.status){
      this.getBlog()
      this.service.SuccessSnackbar(res.message)
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

  getBlog(){
    this.service.blogGet().subscribe((res:any)=> {
      this.blogList = res;
      console.log(res)
    })
  }

  handleDelete(id:number){
    this.service.blogDelete(id).subscribe((res) => {
      console.log(res)
      this.getBlog();
      this.service.SuccessSnackbar(res.message)
    })
  }
}
