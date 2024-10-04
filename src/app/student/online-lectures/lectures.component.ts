import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataFilterPipe } from 'src/app/theme/shared/filter/data-filter.pipe';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { SafePipe } from 'src/pipe/url.pipe';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-student-lectures',
  standalone:true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export default class LecturesComponent {
  lecturesList:any;
  // link:any
  @Input() link: any;
  safeUrl!: SafeResourceUrl;

  // constructor(private sanitizer: DomSanitizer) {}

  constructor(private service:ApiService ,private domSanitizer: DomSanitizer){
    const id = sessionStorage.getItem('courseid')
    this.lecturesGetById(id)
  }



  lecturesGetById(id:any) {
    this.service.lecturesGetById(id).subscribe((res: any) => {
      this.lecturesList = res;
      // console.log(res.length)
    })
  }

  handleClick(link:any){
    console.log(link)
    this.link = link
    // document.getElementById('')
    if (this.link) {
      this.safeUrl = this.transform(link.trim());
    }
    console.log(this.safeUrl ,  this.link)
  }
  
 
  // ngOnChanges() {
  // }

  transform(url: string): SafeResourceUrl {
    // Convert regular YouTube link to embed link if necessary
    // const videoId = this.getVideoIdFromUrl(url);
    const embedUrl = `https://www.youtube.com/embed/${url}`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getVideoIdFromUrl(url: string): string | null {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
}
