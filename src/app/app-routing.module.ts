import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import WelcomeComponent from '@/pages/welcome/welcome.component';
import IndexComponent from '@/pages/index/index.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'index', component: IndexComponent },
];

@NgModule({
  declarations: [IndexComponent, WelcomeComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
