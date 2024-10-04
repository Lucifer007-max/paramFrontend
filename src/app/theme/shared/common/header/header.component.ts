import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  token:any;
  logo:any;
 constructor(private service: ApiService) {
    this.token = sessionStorage.getItem('token')
    this.logoGet()
 }


 handleLogout(){
sessionStorage.clear()
window.location.reload();

 }
 logoGet() {
  this.service.logoGet().subscribe((res => {
    this.logo = res
  }))
}
}

