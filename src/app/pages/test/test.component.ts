
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  imports: [CommonModule, SharedModule],
  styleUrls: ['./test.component.scss']
})
export default class TestComponent {
  URLresponse:any;
  URLId:any = 0
  notesDesc:any;
  notesPrice:any;
  notesImage:any;
  notesList:any;
  constructor( private route: ActivatedRoute, public service :ApiService) { }

  ngOnInit(): void {
    this.URLresponse = this.route.params.subscribe((params:any) => {
      // this.loading = this.loader.hide();
      this.URLId = params['id'];
      this.getTest(this.URLId)
      // this.Title = +params['Title']
      // this.getById(this.id);
      // this.LoadActivitesEvents(this.id);
    })
  }


  getTest(id:any) {
    this.service.testGetById(id).subscribe((res) => {
      console.log(res)
      this.notesList = res;
      this.notesDesc = res[0].desc
      this.notesPrice = res[0].price
      this.notesImage = res[0].imagePath

    })
  }

  ngOnDestroy() {
    this.URLresponse.unsubscribe();
  }
}
