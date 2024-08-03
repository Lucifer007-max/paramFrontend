
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-study-abroad',
  standalone: true,
  templateUrl: './study-abroad.component.html',
  imports: [CommonModule, SharedModule],
  styleUrls: ['./study-abroad.component.scss']
})
export default class StudyAbroadComponent {

}
