import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordValid = false;
  cPasswordValid = false;
  formStatus = false;
  constructor(public usersService: UsersService) {}

  resetPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.formStatus = true;
    if (form.value.password == "" || form.value.password.length < 6) {
      this.passwordValid = false;
    } else {
      this.passwordValid = true;
    }
    if(form.value.cpassword !== form.value.password){
      this.cPasswordValid = false;
    }else{
      this.cPasswordValid = true;
    }
    if (this.passwordValid && this.cPasswordValid) {
      this.usersService.resetPassword(form.value.password);
    }else{
      return;
    }
   
    form.resetForm();
    this.formStatus = false;
  }

  ngOnInit() {}
}
