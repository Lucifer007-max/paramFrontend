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
        path: 'admin',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
      },
    ]
  },


  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: 'admin/signup',
      //   loadComponent: () => import('./demo/authentication/sign-up/sign-up.component'),

      // },

      {
        path: 'admin/dashboard',
        loadComponent: () => import('./demo/dashboard/dash-analytics/dash-analytics.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-course',
        loadComponent: () => import('./demo/course/add-course/add-course.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-student',
        loadComponent: () => import('./demo/students/add-student/add-student.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-banner',
        loadComponent: () => import('./demo/banner/banner.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-testimonial',
        loadComponent: () => import('./demo/testimonial/testimonial.component'),
        // canActivate: [AuthGuard]
      }
    ]
  },

  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./demo/authentication/sign-up/sign-up.component'),

      },
      {
        path: 'student',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
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
