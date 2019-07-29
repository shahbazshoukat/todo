import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../user.service';
import { Subscription } from 'rxjs';
import { TasksService } from '../task.service';
import { User } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public username: string;


  constructor(private authService: UsersService, private tasksService: TasksService) {}

  ngOnInit() {

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.autoAuthUser();
    this.username = this.authService.getUsername();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;



      });
  }




  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
