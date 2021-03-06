import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Task } from "../task.model";
import { TasksService } from "../task.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ListsService } from "../list.service";
import { List } from "../list.model";
import { UsersService } from '../user.service';

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskCardComponent implements OnInit, OnDestroy {

  isLoading = false;
  tasks: Task[] = [];
  tasks2: Task[] = [];
  private tasksSub: Subscription;
  public taskCardTitle: string = "All Tasks";
  constructor(
    private tasksService: TasksService,
    public router: Router,
    private listsService: ListsService,
    public route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("list")) {
        this.isLoading = true;
        this.taskCardTitle = "Lists";
        this.tasks = this.tasksService.getTasksByList(paramMap.get("list"));
        this.isLoading = false;
        console.log(this.tasks);
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            //this.tasks = tasks;
          });
      } else if (paramMap.has("label")) {
        this.isLoading = true;
        this.taskCardTitle = "Labels";
        this.tasks = this.tasksService.getTasksByLabel(paramMap.get("label"));
        this.isLoading = false;
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            //this.tasks = tasks;
          });
      } else {
        this.isLoading = true;
        this.taskCardTitle = "All Tasks";
        this.tasksService.getTasks();
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;
            this.isLoading = false;
            //this.tasksService.searchTasks("p");
          });
      }
    });

  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  editTask(taskId: string) {
    this.router.navigate(["/create", { taskId: taskId }]);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
