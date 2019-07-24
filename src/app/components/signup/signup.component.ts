import { Component, OnInit } from '@angular/core';
import {UsersService} from "../user.service";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  constructor(public usersService: UsersService) { }


  onAddUser(form: NgForm){
    if(form.invalid){
      return;
    }
    this.usersService.addUser(form.value.name, form.value.email, form.value.password);
    form.resetForm();
  }

  ngOnInit() {
  }

}
