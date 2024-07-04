import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule, RouterModule],
  styleUrls: ['./course.component.scss']
})
export default class CourseComponent {

}
