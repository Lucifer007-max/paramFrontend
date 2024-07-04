import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./testimonial.component.scss']
})
export default class TestimonialComponent {

}
