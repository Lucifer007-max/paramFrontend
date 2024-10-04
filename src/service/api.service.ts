import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TokenInterceptor } from 'src/interceptors/admin/interceptors.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = environment.apiUrl;
  header: any
  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem('token')?.toString();
    this.header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    });
  }


  ErrorSnackbar(message: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'error',
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton: false,
      showConfirmButton: false
    })
  }
  SuccessSnackbar(message: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      timer: 6000,
      icon: 'success',
      html: ` <small> ${message}</small>`,
      timerProgressBar: true,
      showCloseButton: false,
      showConfirmButton: false
    })
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }
  isAuthenticatedAdmin(): boolean {
    const token = sessionStorage.getItem('admintoken');
    return !!token;
  }

  register(payload: any) {
    const requestHeaders = { headers: this.header };
    return this.httpClient.post(this.baseUrl + 'admin/register', payload)
      .pipe(catchError(this.handleError.bind(this)));
  }

  adminAuth(payload: any) {
    return this.httpClient.post(this.baseUrl + 'admin/authenticateAdmin', payload)
      .pipe(catchError(this.handleError.bind(this)));
  }
  blogService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    return this.httpClient.post(this.baseUrl + 'Blog', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  bannerService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    return this.httpClient.post(this.baseUrl + 'Banner', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  CourseService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    return this.httpClient.post(this.baseUrl + 'Course', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  TestimonialService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Testimonial', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  AboutService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'About', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  LogoService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Logo', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  MerchandiesService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Merchandies', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  NotesService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Notes', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  LecturesService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Lectures', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }


  TestService(payload: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.post(this.baseUrl + 'Test', formData)
      .pipe(catchError(this.handleError.bind(this)));
  }

  TestServiceUpdate(payload: any, id:any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
        console.log(key, payload[key])
      }
    }

    return this.httpClient.put(this.baseUrl + 'Test/'+ id, formData)
      .pipe(catchError(this.handleError.bind(this)));
  }
  // NotesService(payload: any) {
  //   const formData: FormData = new FormData();
  //   for (const key in payload) {
  //     if (payload.hasOwnProperty(key)) {
  //       formData.append(key, payload[key]);
  //       console.log(key, payload[key]);
  //     }
  //   }

  //   // Assuming 'images' is the key for the binary data
  //   formData.append('images', payload.images);

  //   const headers = new HttpHeaders({
  //     accept: 'text/plain',
  //     'Content-Type': 'multipart/form-data',
  //   });

  //   return this.httpClient.post(this.baseUrl + 'Notes', formData, { headers })
  //     .pipe(catchError(this.handleError.bind(this)));
  // }


  courseDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Course/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  courseUpdate(course: any, id: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'Course/' + id, course, {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'accept': '*/*'
      // })
    }).pipe(catchError(this.handleError.bind(this)));
  }

  testimonialDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Testimonial/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  merchandiesDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Merchandies/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  lecturesDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Lectures/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  testDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Test/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }

  courseGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Course')
      .pipe(catchError(this.handleError.bind(this)));
  }
  aboutGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'About')
      .pipe(catchError(this.handleError.bind(this)));
  }
  logoGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Logo')
      .pipe(catchError(this.handleError.bind(this)));
  }
  lecturesGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Lectures')
      .pipe(catchError(this.handleError.bind(this)));
  }
  testGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Test')
      .pipe(catchError(this.handleError.bind(this)));
  }
  notesGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Notes')
      .pipe(catchError(this.handleError.bind(this)));
  }

  courseGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Course/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  blogGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Blog/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  notesGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Notes/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  testGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Test/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  merchandiesById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Merchandies/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  lecturesGetById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Lectures/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  bannerGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Banner')
      .pipe(catchError(this.handleError.bind(this)));
  }
  testimonialGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Testimonial')
      .pipe(catchError(this.handleError.bind(this)));
  }


  merchandesGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Merchandies')
      .pipe(catchError(this.handleError.bind(this)));
  }
  blogGet(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'Blog')
      .pipe(catchError(this.handleError.bind(this)));
  }
  bannerDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Banner/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  blogDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Blog/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  notesDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Notes/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  aboutDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'About/' + id)
      .pipe(catchError(this.handleError.bind(this)));
  }
  logoDelete(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + 'Logo/' + id)
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



  setData(key:any , data:any){
    localStorage.setItem(key , data)
  }

  getData(key:any) {
    return JSON.stringify(localStorage.getItem(key))
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
