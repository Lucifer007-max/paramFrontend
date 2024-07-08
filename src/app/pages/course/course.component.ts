import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
declare const $: any;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule, RouterModule],
  styleUrls: ['./course.component.scss']
})
export default class CourseComponent {
  testimonialList:any = [];
  courseList:any = [];
  isSliderInitialized:boolean = false;
  URLresponse:any;
  URLId:any;
  constructor(private route: ActivatedRoute , private service : ApiService){
    this.getCourse();
    this.getTestimonial();
  }


  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      console.log(this.URLId)
      // this.getCourse(this.URLId)
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
    })
  }

  getCourse(){
    this.service.courseGet().subscribe((res:any)=> {
      this.courseList = res;
    })
  }

  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
      console.log(this.testimonialList, res);
    });
  }

  initializeSlider() {
    $('.testimonial-slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  ngAfterViewChecked() {
    if (this.testimonialList.length > 0 && !this.isSliderInitialized) {
      this.initializeSlider();
      this.isSliderInitialized = true;
    }
  }

}
