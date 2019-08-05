import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./components/auth.guard";
import { AppComponent } from "./app.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";
import { GroupComponent } from "./components/group/group.component";
import { GroupMembersComponent } from "./components/group-members/group-members.component";
import { AddMembersComponent } from "./components/add-members/add-members.component";
import { RequestComponent } from "./components/request/request.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: "create", component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: "tasks", component: TaskCardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "forgotpassword", component: ForgotPasswordComponent },
  { path: "resetpassword/:token", component: ResetPasswordComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "tasks/lists/:list",
    component: TaskCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "tasks/labels/:label",
    component: TaskCardComponent,
    canActivate: [AuthGuard]
  },
  { path: "addgroup", component: AddGroupComponent, canActivate: [AuthGuard] },
  {
    path: "groups/:groupId",
    component: GroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "groupmembers/:groupId",
    component: GroupMembersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addmembers/:groupId",
    component: AddMembersComponent,
    canActivate: [AuthGuard]
  },
  { path: "requests", component: RequestComponent, canActivate: [AuthGuard] },
  { path: "notfound", component: NotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
