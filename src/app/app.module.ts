import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TaskCardComponent } from "./components/task-card/task-card.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthInterceptor } from "./components/auth-interceptor";
import { AddLabelComponent } from "./components/add-label/add-label.component";
import { AddGroupComponent } from "./components/add-group/add-group.component";
import { GroupComponent } from "./components/group/group.component";
import { GroupMembersComponent } from "./components/group-members/group-members.component";
import { AddMembersComponent } from "./components/add-members/add-members.component";
import { RequestComponent } from "./components/request/request.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CreateTaskComponent,
    TaskCardComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AddLabelComponent,
    AddGroupComponent,
    GroupComponent,
    GroupMembersComponent,
    AddMembersComponent,
    RequestComponent,
    NotFoundComponent,
   
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
