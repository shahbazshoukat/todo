import { Component, OnInit } from '@angular/core';
import { UsersService } from './components/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private usersService: UsersService, public router: Router){}

  ngOnInit(){
    this.usersService.autoAuthUser();
    this.userIsAuthenticated = this.usersService.getIsAuth();

    this.authListenerSubs = this.usersService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }


  addTaskBtnClick(){
    this.router.navigate(["/create"]);
  }


  title = 'todo';
}
