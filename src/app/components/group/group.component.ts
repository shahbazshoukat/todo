import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService } from '../task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from "../task.model";
import { Subscription } from 'rxjs';
import { GroupsService } from '../group.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groupId: string;
  tasks: Task[] = [];
  private groupsSub: Subscription;
  constructor(private groupsService : GroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("group")) {
        this.groupId = paramMap.get("group");
        this.groupsService.getTasks(this.groupId);
        this.groupsSub = this.groupsService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;

          });
      } else {
        this.groupId = null;
      }
    });
  }

  addTask(form : NgForm){
    if(form.invalid){
      return;
    }
    console.log(form);
    console.log(this.groupId);
    this.groupsService.addTask(form.value.title, null, null, null, null, this.groupId);
    form.resetForm();
  }
}
