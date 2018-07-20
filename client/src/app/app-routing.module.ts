import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { YoloComponent } from './yolo/yolo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    children: [],
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    children: [],
  },
  {
    path: 'yolo',
    pathMatch: 'full',
    component: YoloComponent,
    children: [],
  },
  {
    path: '**',     
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
