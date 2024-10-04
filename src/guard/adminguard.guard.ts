// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private Api: ApiService, private router: Router) {}
  canActivate(): boolean {
    if (this.Api.isAuthenticatedAdmin()) {
      return true;
    } else {
      this.Api.ErrorSnackbar('You are not Authorized ! Login Again')
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
