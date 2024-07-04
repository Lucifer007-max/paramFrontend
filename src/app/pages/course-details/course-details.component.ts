import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
    })
  }


  ngOnDestroy() {
    this.URLresponse.unsubscribe();
  }

}
