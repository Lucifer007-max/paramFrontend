import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export default class BlogsComponent {

}
