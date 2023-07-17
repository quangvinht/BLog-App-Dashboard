import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './services/auth.guard';
import { SubsrcibersComponent } from './subsrcibers/subsrcibers.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'categories',
    canActivate: [AuthGuardService],
    component: CategoriesComponent,
  },
  {
    path: 'posts',
    component: AllPostComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'posts/new',
    component: NewPostComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'subsrcibers',
    component: SubsrcibersComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
