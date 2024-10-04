import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {
  aboutForm: any;
  wfile: File | any = null;
  List: any;
  loader: boolean = false;
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
  constructor(private FB: FormBuilder, private service: ApiService) { }

  ngOnInit(): void {
    this.getAbout()
    {
      this.aboutForm = this.FB.group({
        title: ['', Validators.required],
        image: ['', Validators.required],
      })
    }

   
  // this.editorConfig = {
  //   charCounterCount: true,
  //   toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle'],
  //   pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons', 'entities', 'fontAwesome', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quote', 'save', 'table', 'url', 'video'],
  // };
  }


  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log(this.wfile)
    }
  }

  submit() {
    this.loader = true;
    const payLoad = {
      "title": this.aboutForm.value.title,
      "image": this.wfile,
    }
    this.service.AboutService(payLoad).subscribe((res: any) => {
      if (res.status) {
        // this.getBanner()
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }


  getAbout() {
    this.service.aboutGet().subscribe((res => {
      this.List = res
    }))
  }

  handleDelete(id: number) {
    this.service.aboutDelete(id).subscribe((res) => {
      // console.log(res)
      this.getAbout();
      this.service.SuccessSnackbar(res.message)
    })
  }
}
