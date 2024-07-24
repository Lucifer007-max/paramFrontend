import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SharedModule],

  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export default class ContactComponent {

}
