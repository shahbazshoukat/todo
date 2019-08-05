import { Component, OnInit } from "@angular/core";
import { UsersService } from "../user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.usersService.forgotPassword(form.value.email);

    form.resetForm();
  }
}
