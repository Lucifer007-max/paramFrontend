import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export default class ShopDetailsComponent {
  URLresponse:any;
  URLId:any = 0
  courseTitle:any;
  shopPrice:any;
  shopImage:any;
  title:any
  constructor( private route: ActivatedRoute, public service :ApiService) { }

  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      // this.getCourse(this.URLId)
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
      this.getMerchandies(this.URLId)
    })
  }


  getMerchandies(id:any) {
    this.service.merchandiesById(id).subscribe((res)=> {
      this.shopImage  = res.imagePath
      this.shopPrice  = res.price
      this.title  = res.title
      console.log(res)
    })
  }

}
