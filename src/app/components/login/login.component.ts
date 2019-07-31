import { Component, OnInit } from '@angular/core';
import {UsersService} from "../user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = "";
  isValid = true;
  private userSub : Subscription
  constructor(private router: Router,public usersService: UsersService) { }

  async onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    await this.usersService.loginUser(form.value.email, form.value.password);
    this.isValid = this.usersService.getIsAuth();
    if(!this.isValid){
      this.errorMessage = "username or password incorrect";
    }
    console.log(this.isValid);

    form.resetForm();
  }

  ngOnInit() {
    const isAuth = this.usersService.getIsAuth();
    if(isAuth){
      this.router.navigate(["/tasks"]);
    }
  }

}
