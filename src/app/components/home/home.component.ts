import { Component, OnInit } from '@angular/core';
import { TasksService } from '../task.service';
import { ListsService } from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  addTaskPage = false;
  addListPage = false;

  constructor(private tasksService : TasksService, public listsService: ListsService, public router: Router) { }




  ngOnInit() {

  }

}
