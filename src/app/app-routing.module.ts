import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/user/add/add.component';
import { BusinessComponent } from './components/user/add/business/business.component';
import { PersonalComponent } from './components/user/add/personal/personal.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'user/add',
    component: AddComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'personal'
      },
      {
        path: 'personal',
        component: PersonalComponent
      },
      {
        path: 'business',
        component: BusinessComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
