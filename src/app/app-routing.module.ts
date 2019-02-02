import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'email', loadChildren: './modules/email/email.module#EmailModule'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: '', redirectTo: 'email', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
