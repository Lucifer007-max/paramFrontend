import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export default class BlogDetailsComponent {

  URLresponse:any;
  URLId:any = 0
  blogTitle:any;
  blogDescription:any;
  blogImage:any;
  constructor( private route: ActivatedRoute, public service :ApiService) { }

  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      this.getBlog(this.URLId)
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
    })
  }

  getBlog(id:any) {
    this.service.blogGetById(id).subscribe((res) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>.",res)
      this.blogTitle = res.title
      this.blogDescription = res.description
      this.blogImage = res.imagePath
    })
  }

}
