import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
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
export default class HomeComponent implements OnInit, AfterViewChecked {
  bannerList:any;
  testimonialList:any = [];
  courseList:any = [];
  merchandiesList:any = [];
  // testimonials:any;
  Loader:boolean = false;
  isSliderInitialized:boolean = false;
  aboutList:any;
  constructor(private service : ApiService){}


  ngOnInit(): void {
    this.Loader = true
    this.getAbout();
    this.getBanner();
    this.getCourse();
    this.getTestimonial();
    this.getMerchandies();
  }

  truncateText(text: string, wordLimit: number): string {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  }


  getBanner(){
    this.service.bannerGet().subscribe((res:any)=> {
      this.bannerList = res;
    })
  }
  getCourse(){
    this.service.courseGet().subscribe((res:any)=> {
      this.courseList = res;
      this.Loader = false
    })
  }
  getMerchandies(){
    this.service.merchandesGet().subscribe((res:any)=> {
      this.merchandiesList = res;
      this.Loader = false
    })
  }
  getTestimonial() {
    this.service.testimonialGet().subscribe((res: any) => {
      this.testimonialList = res;
      this.Loader = false
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


  getAbout() {
    this.service.aboutGet().subscribe((res => {
      this.aboutList = res
    }))
  }
}
