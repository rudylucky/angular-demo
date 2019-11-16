import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '@/system/components/welcome/welcome.component';
import { UserInfoComponent } from '@/system/components/user-info/user-info.component';
import { RoleInfoComponent } from '@/system/components/role-info/role-info.component';
import { DepartmentComponent } from '@/system/components/department/department.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user-info' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'role-info', component: RoleInfoComponent },
  { path: 'department', component: DepartmentComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
