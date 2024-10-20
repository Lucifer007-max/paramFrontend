import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
declare const $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit {

  
  observer!: IntersectionObserver;


  activeIndex = 0;
  firstLoad = true;
  items = [
    { image: 'https://via.placeholder.com/800x200?text=First+Image', text: 'Text 1' },
    { image: 'https://via.placeholder.com/800x200?text=Second+Image', text: 'Text 2' },
    { image: 'https://via.placeholder.com/800x200?text=Third+Image', text: 'Text 3' },
    { image: 'https://via.placeholder.com/800x200?text=Fourth+Image', text: 'Text 4' },
    { image: 'https://via.placeholder.com/800x200?text=Fifth+Image', text: 'Text 5' }
  ];

  nextSlide() {
    this.firstLoad = false;
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }

  prevSlide() {
    this.firstLoad = false;
    this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
  }





  ngAfterViewInit() {
    this.setupObserver();
  }

  setupObserver() {
    const ids = ['engineer_doctor', 'aboutus', 'servicees', 'study_resources', 'div4', 'div5'];  // IDs of the divs
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');  // Add animation class when in view
        }
      });
    }, { threshold: 0.1 });

    ids.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        this.observer.observe(element);  // Observe each div by its ID
      }
    });
  }
  
  
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
