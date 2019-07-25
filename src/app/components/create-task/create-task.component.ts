import { Component, OnInit } from "@angular/core";
import { Task } from "../task.model";
import { List } from "../list.model";
import { Label } from "../label.model";
import { NgForm } from "@angular/forms";
import { TasksService } from "../task.service";
import { ListsService } from "../list.service";
import { LabelsService } from "../label.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"]
})
export class CreateTaskComponent implements OnInit {
  enteredTitle = "";
  enteredNotes = "";
  enteredList = "";
  enteredReminder = "";
  enteredLabels : string[] = [];
  addLabelFlag: boolean = false;
  editTaskFlag: boolean = false;
  private mode: string = "create";
  taskId: string;
  taskToUpdate: Task = null;
  lists: List[] = [];
  private listsSub: Subscription;
  flag:boolean=true;

  labels: Label[] = [];
  private labelsSub: Subscription;

  constructor(
    private tasksService: TasksService,
    private listsService: ListsService,
    private labelsService: LabelsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addLabel(id: string) {
    var index = this.checkLabel(id);
    if (index > -1) {
      this.enteredLabels.splice(index, 1);
    } else {
      this.enteredLabels.push(id);
    }
  }

  checkLabel(lblId: string) {
    var index = -1;

    index = this.enteredLabels.findIndex(item => item == lblId);
    return index;
  }

  onAddALabel() {
    this.addLabelFlag = true;
  }

  onAddLabel(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.labelsService.addLabel(form.value.labelInput);

    form.resetForm();
    this.addLabelFlag = false;
  }

  onAddTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode == "create"){
      this.tasksService.addTask(
        form.value.title,
        form.value.notes,
        form.value.list,
        this.enteredLabels,
        form.value.reminder,
        null
      );
    }else{
      this.tasksService.updateTask(
        this.taskId,
        form.value.title,
        form.value.notes,
        form.value.list,
        this.enteredLabels,
        form.value.reminder,
        null
      );
    }
    form.resetForm();
  }

  ngOnInit() {
    this.listsService.getLists();
    this.listsSub = this.listsService
      .getListUpdateListener()
      .subscribe((lists: List[]) => {
        this.lists = lists;
      });

    this.labelsService.getLabels();
    this.labelsSub = this.labelsService
      .getLabelUpdateListener()
      .subscribe((labels: Label[]) => {
        this.labels = labels;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.mode = "edit";
        this.taskId = paramMap.get("taskId");
        this.taskToUpdate = this.tasksService.getTaskById(this.taskId);
        console.log(this.taskToUpdate);
      } else {
        this.mode = "create";
        this.taskId = null;
      }
    });
  }

  getSelectedList(listTitle : string){
    console.log(listTitle);
    if(this.taskToUpdate.list == listTitle){
      return true;
    }else{
      return false;
    }
  }

  getSelectedLabel(lbl:string){
    this.taskToUpdate.label.forEach(label => {
      if(lbl == label){
        this.flag = true;
      }else{
        this.flag = false;
      }
      return this.flag;
    });
  }

}
