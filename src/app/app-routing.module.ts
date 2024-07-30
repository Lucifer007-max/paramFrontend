// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'src/guard/authguard.guard';
import { StudentComponent } from './theme/layout/student/student.component';

const routes: Routes = [


  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component')
      },
      {
        path: 'maincourse/:id',
        loadComponent: () => import('./pages/course/course.component'),
      },
      {
        path: 'course/:id',
        loadComponent: () => import('./pages/course-details/course-details.component'),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
      },
      {
        path: 'blogs',
        loadComponent: () => import('./pages/blogs/blogs.component')
      },
      {
        path: 'study-abroad',
        loadComponent: () => import('./pages/study-abroad/study-abroad.component')
      },

    ]
  },


  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: 'admin/dashboard',
        loadComponent: () => import('./admin/dashboard/dash-analytics/dash-analytics.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-course',
        loadComponent: () => import('./admin/course/add-course/add-course.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-student',
        loadComponent: () => import('./admin/students/add-student/add-student.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-banner',
        loadComponent: () => import('./admin/banner/banner.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-testimonial',
        loadComponent: () => import('./admin/testimonial/testimonial.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/merchandise-management',
        loadComponent: () => import('./admin/merchandise/merchandise.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/about-management',
        loadComponent: () => import('./admin/about/about.component'),
        // canActivate: [AuthGuard]
      },
    ]
  },

  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () => import('./student/dashboard/dashboard.component'),

      },
      {
        path: 'course',
        loadComponent: () => import('./admin/authentication/sign-in/sign-in.component')
      }
    ]
  },


  {path:'**' ,  component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
