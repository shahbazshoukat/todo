import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth.guard';
import { AppComponent } from './app.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { GroupComponent } from './components/group/group.component';
import { GroupMembersComponent } from './components/group-members/group-members.component';


const routes: Routes = [

  {path: "create", component: CreateTaskComponent, canActivate: [AuthGuard]},
  {path: "tasks", component: TaskCardComponent , canActivate: [AuthGuard] },
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "",component:HomeComponent, canActivate:[AuthGuard]},
  {path: "tasks/lists/:list", component:TaskCardComponent, canActivate: [AuthGuard]},
  {path: "tasks/labels/:label", component:TaskCardComponent, canActivate: [AuthGuard]},
  {path :"addgroup", component: AddGroupComponent, canActivate: [AuthGuard]},
  {path: "groups/:group", component: GroupComponent, canActivate: [AuthGuard]},
  {path: "groupmembers/:groupId", component: GroupMembersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
