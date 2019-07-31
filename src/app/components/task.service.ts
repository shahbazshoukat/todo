import { Task } from "./task.model";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Label } from "./label.model";
import { Router } from "@angular/router";
import { ListsService } from "./list.service";
import { LabelsService } from "./label.service";
import { stringify } from "querystring";
import { TaskCardComponent } from "./task-card/task-card.component";

@Injectable({ providedIn: "root" })
export class TasksService {
  private tasks: any = [];
  private tasksUpdated = new Subject<Task[]>();
  private transformedTasks: any = [];
  private searchedTasks: any = [];
  private searchedTasksUpdated = new Subject<Task[]>();
  constructor(
    private http: HttpClient,
    private router: Router,
    public listsService: ListsService,
    public labelsService: LabelsService
  ) {}

  addTask(
    title: string,
    notes: string,
    list: string,
    label: string[],
    reminder: string,
    groupId: string
  ) {
    const task: Task = {
      _id: null,
      title: title,
      notes: notes,
      list: list,
      label: label,
      reminder: reminder,
      groupId : groupId,
      userId : null
    };

    this.http
      .post<{ message: string; taskId: string }>(
        "http://localhost:3000/api/tasks",
        task
      )
      .subscribe(responseData => {
        const id = responseData.taskId;
        task._id = id;
        console.log(responseData.message);
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/tasks"]);
      });
  }

  getTasks() {
    let tTasks;
    this.http
      .get<{ message: string; tasks: any }>("http://localhost:3000/api/tasks")
      .pipe(
        map(taskData => {
          tTasks = taskData.tasks;
          return taskData.tasks.map(task => {
            return {
              _id: task._id,
              title: task.title,
              notes: task.notes,
              list: task.list,
              label: task.labels,
              reminder: task.reminder,
              userId: task.userId,
              groupId: task.groupId
            };
          });
        })
      )
      .subscribe(transformedTasks => {
        transformedTasks.forEach(task => {
          let list;
          list = this.listsService.getListById(task.list);
          task.list = list.title;
        });
        transformedTasks.forEach(task => {
          let label;
          task.label.forEach((lbl,i) => {
            label = this.labelsService.getLabelById(lbl);
            task.label[i] = label.title;
          });
        });
        this.tasks = transformedTasks;
        this.transformedTasks = tTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(
    id: string,
    title: string,
    notes: string,
    list: string,
    label: string[],
    reminder: string,
    groupId: string
  ) {
    console.log("inside update service");
    const task: Task = {
      _id: id,
      title: title,
      notes: notes,
      list: list,
      label: label,
      reminder: reminder,
      groupId: groupId,
      userId : null
    };

    this.http
      .put("http://localhost:3000/api/tasks/" + id, task)
      .subscribe(response => {
        console.log(response);
        const updatedTasks = [...this.tasks];
        const oldPostIndex = updatedTasks.findIndex(p => p.id === task._id);
        updatedTasks[oldPostIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/tasks"]);
      });
  }

  
  searchTasks(str: string) {
    let sTasks:any = [];
    this.tasks.forEach(task => {
      if(task.title.indexOf(str) != -1){
        sTasks.push(task);
      }
    });
    this.searchTasks = sTasks;
    this.searchedTasksUpdated.next([...this.searchedTasks]);
  }

  

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }
  getSearchedTaskUpdateListener() {
    return this.searchedTasksUpdated.asObservable();
  }

  getTaskById(taskId: string) {
    return { ...this.transformedTasks.find(t => t._id == taskId) };
  }

  getTasksByList(list: string) {
    let tasks : Task[] = [];
    this.tasks.forEach(task => {
   
      if(task.list == list){
        console.log(task);
        tasks.push(task);
      }
    });
    return tasks;
  }

  getTasksByLabel(label: string) {
    let tasks : Task[] = [];
    this.tasks.forEach(task => {
      let index = task.label.indexOf(label);
      if(index != -1){
        tasks.push(task);
      }
    });
    return tasks;
  }

  deleteTask(taskId: string) {
    return this.http
      .delete("http://localhost:3000/api/tasks/" + taskId)
      .subscribe(result => {
        console.log(result);
        this.getTasks();
      });
  }
}
