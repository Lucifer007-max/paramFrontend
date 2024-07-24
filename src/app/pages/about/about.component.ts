import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SharedModule],

  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export default class AboutComponent {

}
