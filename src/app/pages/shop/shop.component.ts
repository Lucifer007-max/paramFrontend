import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SharedModule,RouterModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export default class ShopComponent {
  merchandiesList:any;
  constructor(private service:ApiService) {
    this.getMerchandies()
  }

  getMerchandies(){
    this.service.merchandesGet().subscribe((res:any)=> {
      this.merchandiesList = res;
      // this.Loader = false
    })
  }
}
