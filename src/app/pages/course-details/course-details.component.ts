import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-course-details',
  standalone:true,
  imports: [CommonModule, SharedModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export default class CourseDetailsComponent implements OnInit {

  URLresponse:any;
  URLId:any = 0
  courseTitle:any;
  courseTag:any;
  courseImage:any;
  constructor( private route: ActivatedRoute, public service :ApiService) { }

  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      this.getCourse(this.URLId)
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
    })
  }


  getCourse(id:any) {
    this.service.courseGetById(id).subscribe((res) => {
      console.log(res)
      this.courseTitle = res.title
      this.courseTag = res.tags
      this.courseImage = res.image
    })
  }

  ngOnDestroy() {
    this.URLresponse.unsubscribe();
  }

}
