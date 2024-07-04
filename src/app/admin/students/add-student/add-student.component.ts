import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, SharedModule,],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export default class AddStudentComponent {

}
