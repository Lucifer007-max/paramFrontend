// Angular Import
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class StudentNavigationComponent {
  // public props
  windowWidth = window.innerWidth;
  @Output() NavMobCollapse = new EventEmitter();

  // public method
  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }
}
