import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Task } from "../task.model";
import { TasksService } from "../task.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ListsService } from "../list.service";
import { List } from "../list.model";

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.css"]
})
export class TaskCardComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  tasks2: Task[] = [];
  private tasksSub: Subscription;
  public taskCardTitle: string = "All Tasks";
  constructor(
    private tasksService: TasksService,
    public router: Router,
    private listsService: ListsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("list")) {
        this.taskCardTitle = "Lists";
        this.tasksService.getTasksByList(paramMap.get("list"));
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          });
      } else if (paramMap.has("label")) {
        this.taskCardTitle = "Labels";
        this.tasksService.getTasksByLabel(paramMap.get("label"));
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          });
      } else {
        this.taskCardTitle = "All Tasks";
        this.tasksService.getTasks();
        this.tasksSub = this.tasksService
          .getTaskUpdateListener()
          .subscribe((tasks: Task[]) => {
            this.tasks = tasks;

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
