import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';
declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit, AfterViewInit {
  bannerList:any;
  testimonialList:any = [];
  courseList:any = [];
  // testimonials:any;
  constructor(private service : ApiService){}

  ngOnInit(): void {
    this.getBanner();
    this.getCourse();
    this.getTestimonial();
  }

  getBanner(){
    this.service.bannerGet().subscribe((res:any)=> {
      this.bannerList = res;
    })
  }
  getCourse(){
    this.service.courseGet().subscribe((res:any)=> {
      this.courseList = res;
    })
  }
  getTestimonial(){
    this.service.testimonialGet().subscribe((res:any)=> {
      this.testimonialList = res;
      console.log(res)
    })
  }


  testimonials = [
    {
        "id": 1,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    },
    {
        "id": 2,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    },
    {
        "id": 3,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    },
    {
        "id": 4,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    },
    {
        "id": 5,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    },
    {
        "id": 6,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30 "
    },
    {
        "id": 7,
        "title": "demo                                                                                                                                                                                                                             ",
        "tag": "Student                                                                                                                                                                                                                          ",
        "description": "Hello                                                                                                                                                                                                                            ",
        "image": "https://via.placeholder.com/30"
    }
];

  ngAfterViewInit(): void {
    console.log(this.testimonials)
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

}
