import { Component } from '@angular/core';
import { SharedModule } from "../../theme/shared/shared.module";
// import { HeaderComponent } from "../../theme/shared/common/header/header.component";

@Component({
  selector: 'app-study-abroad',
  templateUrl: './study-abroad.component.html',
  standalone:true,
  imports: [SharedModule],
  styleUrls: ['./study-abroad.component.scss'],
  // imports: [HeaderComponent]
})
export default class StudyAbroadComponent {

}
