import {Group} from "./group.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {Task} from "./task.model";


@Injectable({providedIn:'root'})
export class GroupsService{
  private groups:any=[];
  private groupsUpdated = new Subject<Group[]>();
  private tasks: any = [];
  private tasksUpdated = new Subject<Task[]>();
  constructor (private http: HttpClient) {}



  addGroup(title: string){
    const group: Group = {_id: null, title: title, members: null};
    this.http.post<{message: string, groupId: string}>('http://localhost:3000/api/groups', group)
    .subscribe(responseData => {
      const id = responseData.groupId;
      group._id = id;
      console.log(responseData);
      this.groups.push(group);
      this.groupsUpdated.next([...this.groups]);
    })
  }

  getGroups(){
    this.http.get<{message: string, groups: any}>('http://localhost:3000/api/groups')
    .pipe(
      map(groupData =>{

        return groupData.groups.map(group =>{
          return {
            id: group._id,
            title: group.title,
            members: group.members
          }
        })
      })
    ).subscribe(transformedGroups =>{
      this.groups = transformedGroups;
      this.groupsUpdated.next([...this.groups]);
    })
  }
  getGroupsUpdateListener(){
    return this.groupsUpdated.asObservable();
  }

  deleteGroup(groupId: string) {
    return this.http
      .delete("http://localhost:3000/api/groups/" + groupId).subscribe(result => {
        console.log(result);
        this.getGroups();
      });

  }


  getGroupById(groupId : string): Observable<any>{
    return this.http.get<{message: string, groups: any}>('http://localhost:3000/api/groups' + groupId);
  }



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

  getTasks(groupId : string) {
    let tTasks;
    this.http
      .get<{ message: string; tasks: any }>("http://localhost:3000/api/tasksbygroup" + groupId)
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
        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }
  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }


}


