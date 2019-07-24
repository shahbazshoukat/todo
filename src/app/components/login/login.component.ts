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

  private userSub : Subscription
  constructor(private router: Router,public usersService: UsersService) { }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.usersService.loginUser(form.value.email, form.value.password);


    form.resetForm();
  }

  ngOnInit() {
  }

}
