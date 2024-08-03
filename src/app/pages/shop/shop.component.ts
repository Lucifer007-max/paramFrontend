import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export default class ShopComponent {

}
