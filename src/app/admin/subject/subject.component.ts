import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export default class SubjectComponent {
  subjectForm:any
  handleSubmit() {
    
  }
}
