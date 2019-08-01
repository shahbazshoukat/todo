import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TasksService } from "../task.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Task } from "../task.model";
import { Subscription } from "rxjs";
import { GroupsService } from "../group.service";
import { UsersService } from "../user.service";
import { Group } from "../group.model";
import io from "socket.io-client";
@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  isLoading = false;
  socket;
  groupId: string;
  tasks: Task[] = [];
  addedBy: string;
  loggedInUser: string = "";
  isAMember: any;
  private groups: Group[] = [];
  private groupsSub: Subscription;
  constructor(
    private groupsService: GroupsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.socket = io("http://localhost:3000");
  }

  ngOnInit() {
    this.loggedInUser = this.usersService.getUserId();
    this.usersService.getUsers();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("groupId")) {
        this.groupId = paramMap.get("groupId");
        this.isLoading = true;
        this.groupsService.getTasks(this.groupId);
        this.socket.on("tasksPage", () => {
          this.groupsService.getTasks(this.groupId);
        });
        this.groupsSub = this.groupsService
          .getTaskUpdateListener()
          .subscribe((tasks: any[]) => {
            this.tasks = tasks;
            this.tasks.forEach(task => {
              this.usersService.getUserById(task.userId).subscribe(user => {
                task.userId = user.name;
              });
            });
            this.isLoading = false;
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
    this.socket.emit("tasks", {});
  }

  onDelete(taskId: string) {
    console.log(taskId);
    this.groupsService.deleteTask(taskId, this.groupId);
    this.socket.emit("tasks", {});
  }
}
