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
      id: null,
      title: title,
      notes: notes,
      list: list,
      label: label,
      reminder: reminder,
      groupId : groupId
    };

    this.http
      .post<{ message: string; taskId: string }>(
        "http://localhost:3000/api/tasks",
        task
      )
      .subscribe(responseData => {
        const id = responseData.taskId;
        task.id = id;
        console.log(responseData.message);
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
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
              id: task._id,
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
        this.transformedTasks = transformedTasks;
        transformedTasks.forEach(task => {
          this.listsService.getListById(task.list).subscribe(list => {
            if (list.lists != null) {
              task.list = list.lists.title;
            } else {
              task.list = "";
            }
          });
        });

        transformedTasks.forEach(task => {
          task.label.forEach((label, i) => {
            this.labelsService.getLabelById(label).subscribe(lbl => {
              if (lbl.labels != null) {
                task.label[i] = lbl.labels.title;
              } else {
                task.label[i] = "";
              }
            });
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
    const task: Task = {
      id: id,
      title: title,
      notes: notes,
      list: list,
      label: label,
      reminder: reminder,
      groupId: groupId
    };

    this.http
      .put("http://localhost:3000/api/tasks/" + id, task)
      .subscribe(response => {
        console.log(response);
        const updatedTasks = [...this.tasks];
        const oldPostIndex = updatedTasks.findIndex(p => p.id === task.id);
        updatedTasks[oldPostIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/tasks"]);
      });
  }

  getTasksByList(list: string) {
    this.http
      .get<{ message: string; tasks: any }>(
        "http://localhost:3000/api/tasksbylist" + list
      )
      .pipe(
        map(taskData => {
          return taskData.tasks.map(task => {
            return {
              id: task._id,
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
          this.listsService.getListById(task.list).subscribe(list => {
            if (list.lists != null) {
              task.list = list.lists.title;
            } else {
              task.list = "";
            }
          });
        });

        transformedTasks.forEach(task => {
          task.label.forEach((label, i) => {
            this.labelsService.getLabelById(label).subscribe(lbl => {
              if (lbl.labels != null) {
                task.label[i] = lbl.labels.title;
              } else {
                task.label[i] = "";
              }
            });
          });
        });

        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTasksByLabel(label: string) {
    this.http
      .get<{ message: string; tasks: any }>(
        "http://localhost:3000/api/tasksbylabel" + label
      )
      .pipe(
        map(taskData => {
          return taskData.tasks.map(task => {
            return {
              id: task._id,
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
          this.listsService.getListById(task.list).subscribe(list => {
            if (list.lists != null) {
              task.list = list.lists.title;
            } else {
              task.list = "";
            }
          });
        });

        transformedTasks.forEach(task => {
          task.label.forEach((label, i) => {
            this.labelsService.getLabelById(label).subscribe(lbl => {
              if (lbl.labels != null) {
                task.label[i] = lbl.labels.title;
              } else {
                task.label[i] = "";
              }
            });
          });
        });

        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  searchTasks(str: string) {
    let searchedTasks:Task[] = [];
    this.tasks.forEach(task => {
      if(task.title.search(str)){
        searchedTasks.push(task);
      }
    });
    return searchedTasks;
  }

  getTasksCountByList(list: string) {
    return this.http.get<{ message: string; noOfTasks: string }>(
      "http://localhost:3000/api/taskscountbylist" + list
    );
  }

  getTasksCountByLabel(label: string) {
    return this.http.get<{ message: string; noOfTasks: string }>(
      "http://localhost:3000/api/taskscountbylabel" + label
    );
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTaskById(taskId: string) {
    return { ...this.transformedTasks.find(t => t._id == taskId) };
  }

  getTasksCountList(list: string) {
    return { ...this.tasks.find(t => t.list == list) };
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
