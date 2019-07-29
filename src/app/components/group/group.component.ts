import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TasksService } from "../task.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Task } from "../task.model";
import { Subscription } from "rxjs";
import { GroupsService } from "../group.service";
import { UsersService } from "../user.service";
@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  groupId: string;
  tasks: Task[] = [];
  addedBy: string;
  loggedInUser: string = "";
  isAMember:any;
  private groupsSub: Subscription;
  constructor(
    private groupsService: GroupsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loggedInUser = this.usersService.getUserId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("group")) {
        this.groupId = paramMap.get("group");
       
        this.groupsService.getTasks(this.groupId);
        this.groupsSub = this.groupsService
          .getTaskUpdateListener()
          .subscribe((tasks: any[]) => {
            this.tasks = tasks;
            this.tasks.forEach(task => {
              this.usersService.getUserById(task.userId).subscribe(user => {
                task.userId = user.name;
              });
            });
          });
      } else {
        this.groupId = null;
      }
    });
    this.addedBy = this.usersService.getUserId();
  }

  addTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);
    console.log(this.groupId);
    this.groupsService.addTask(
      form.value.title,
      null,
      null,
      null,
      null,
      this.groupId,
      this.addedBy
    );
    form.resetForm();
  }

  onDelete(taskId: string) {
    console.log(taskId);
    this.groupsService.deleteTask(taskId, this.groupId);
  }

  // isAMember(userId: string, groupId: string) {
  //   let group;
  //   this.groupsService.getGroupById(groupId).subscribe(grp => {
  //     group = grp;
  //   });
  //   group.groups.members.forEach(member => {
  //     console.log(member);
  //     console.log(userId);
  //     if (member == userId) {
  //       return true;
  //     }
  //   });
  //   return false;
  // }
}
