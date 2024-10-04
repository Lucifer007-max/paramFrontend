import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TokenInterceptor } from 'src/interceptors/admin/interceptors.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:String = environment.apiUrl;
  header:any
  constructor(private httpClient : HttpClient) {
    const token  =  localStorage.getItem('token')?.toString();
    this.header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    });
  }


  studentLogin(payload:any): Observable<any>  {
     return this.httpClient.post(this.baseUrl + 'Auth', payload)
       .pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Server-side errors
        if (error.error.errors) {
            errorMessage = Object.values(error.error.errors).flat().join(' ');
        } else {
            errorMessage = error.error.title || errorMessage;
        }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


}  export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
