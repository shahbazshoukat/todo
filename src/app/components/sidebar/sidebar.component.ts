import { Component, OnInit } from "@angular/core";
import { List } from "../list.model";
import { CList } from "../clist.model";
import { Label } from "../label.model";
import { ListsService } from "../list.service";
import { LabelsService } from "../label.service";
import { UsersService } from "../user.service";
import { Subscription } from "rxjs";
import { Router, Route, ParamMap, ActivatedRoute } from "@angular/router";
import { TasksService } from "../task.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  lists: List[] = [];
  private listsSub: Subscription;
  clist: CList[] = [];

  labels: Label[] = [];
  private labelsSub: Subscription;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  addListFlag: boolean = false;
  editListFlag: boolean = false;
  editLabelFlag: boolean = false;
  constructor(
    public listsService: ListsService,
    public labelsService: LabelsService,
    private authService: UsersService,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      var tasks = this.tasksService.getTasksCountList("meetings");
      console.log(tasks);


  }

  getTasksByList(list: string) {
    this.tasksService.getTasksByList(list);
  }

  getTasksCountByList(list: string){
    return this.tasksService.getTasksCountByList(list);
  }

  getTasksCountByLabel(label: string){
    return this.tasksService.getTasksCountByLabel(label);
  }

  getTasksByLabel(label: string) {
    this.tasksService.getTasksByLabel(label);
  }

  onAddAListClick() {
    this.addListFlag = true;
  }

  onEditListClick() {
    this.editListFlag = !this.editListFlag;
  }
  onEditLabelClick() {
    this.editLabelFlag = !this.editLabelFlag;
  }

  onAddList(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.listsService.addList(form.value.listInput);
    form.resetForm();

    this.addListFlag = false;
  }

  deleteList(listId: string) {
    this.listsService.deleteList(listId);
  }
  deleteLabel(listId: string) {
    this.labelsService.deleteLabel(listId);
  }

  addList() {
    this.listsService.setListBtnClick(true);
  }

  allTasks() {
    this.router.navigate(["/tasks"]);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
