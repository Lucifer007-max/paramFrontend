import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataFilterPipe } from 'src/app/theme/shared/filter/data-filter.pipe';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { SafePipe } from 'src/pipe/url.pipe';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-student-profile',
  standalone:true,
  imports: [CommonModule, SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export default class ProfileComponent {
  lecturesList:any;
  link:any
  studentData:any
  state:any
  flag:boolean = false
  constructor(private service:ApiService ,private domSanitizer: DomSanitizer){
    const id = sessionStorage.getItem('courseid')
    const studentData:any = sessionStorage.getItem('student')
    console.log(JSON.parse(studentData))
    this.studentData = JSON.parse(studentData)
    this.state = this.studentData.state.trim()
    this.lecturesGetById(id)
  }


// Example handleSelect method
handleSelect(event: any, field: string) {
  // this[field] = event.target.value;
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
  }

  transform1(url: any): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // applyFilter(query: string) {
  //   this.filteredArray = this.transform(this.array, query);
  // }

  handlepwd(){
    this.flag = !this.flag;

  }
}
