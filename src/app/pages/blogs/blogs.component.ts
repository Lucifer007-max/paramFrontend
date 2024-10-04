import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export default class BlogsComponent {
  blogList:any;
  constructor(private service : ApiService){
    // this.getTestimonial();
    this.getBlog()
  }

  getBlog(){
    this.service.blogGet().subscribe((res:any)=> {
      this.blogList = res;
      console.log(res)
    })
  }

}
