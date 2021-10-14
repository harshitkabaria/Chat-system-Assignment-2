import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component'
import{AdduserComponent} from './adduser/adduser.component'
import {ChatComponent} from './chat/chat.component'
const routes: Routes = [
{path:"", component: LoginComponent},
{path:"dashboard", component:DashboardComponent},
{path:"profile", component:ProfileComponent},
{path:"adduser",component:AdduserComponent},
{path: "chat",component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
