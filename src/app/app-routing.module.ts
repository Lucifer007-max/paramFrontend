// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'src/guard/authguard.guard';
import { StudentComponent } from './theme/layout/student/student.component';
import { AdminAuthGuard } from 'src/guard/adminguard.guard';

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
        path: 'admin-login',
        loadComponent: () => import('./admin/login/login.component'),
        // canActivate: [AuthGuard]
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
       {
        path: 'study-material/:id',
        loadComponent: () => import('./pages/study-material/study-material.component')
      },
       {
        path: 'lectures/:id',
        loadComponent: () => import('./pages/lectures/lectures.component')
      },
       {
        path: 'test/:id',
        loadComponent: () => import('./pages/test/test.component')
      },
      {
        path: 'shop',
        loadComponent: () => import('./pages/shop/shop.component')
      },
      {
        path: 'shop/:id',
        loadComponent: () => import('./pages/shop-details/shop-details.component')
      },
      {
        path: 'blog-details/:id',
        loadComponent: () => import('./pages/blog-details/blogs.component')
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
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-course',
        loadComponent: () => import('./admin/course/add-course/add-course.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-subject',
        loadComponent: () => import('./admin/subject/subject.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-notes',
        loadComponent: () => import('./admin/notes/notes.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-student',
        loadComponent: () => import('./admin/students/add-student/add-student.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-banner',
        loadComponent: () => import('./admin/banner/banner.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-testimonial',
        loadComponent: () => import('./admin/testimonial/testimonial.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/merchandise-management',
        loadComponent: () => import('./admin/merchandise/merchandise.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/about-management',
        loadComponent: () => import('./admin/about/about.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-online-lectures',
        loadComponent: () => import('./admin/online-lectures/online-lectures.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-test',
        loadComponent: () => import('./admin/testseries/testseries.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-logo',
        loadComponent: () => import('./admin/logo/logo.component'),
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin/add-blog',
        loadComponent: () => import('./admin/blog/blog.component'),
        canActivate: [AdminAuthGuard]
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
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./student/profile/profile.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'lectures',
        loadComponent: () => import('./student/online-lectures/lectures.component'),
        canActivate: [AuthGuard]
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
