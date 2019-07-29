import { Component, OnInit } from "@angular/core";
import { List } from "../list.model";
import { CList } from "../clist.model";
import { Label } from "../label.model";
import { Group } from "../group.model";
import { ListsService } from "../list.service";
import { LabelsService } from "../label.service";
import { UsersService } from "../user.service";
import { Subscription } from "rxjs";
import { Router, Route, ParamMap, ActivatedRoute } from "@angular/router";
import { TasksService } from "../task.service";
import { NgForm } from "@angular/forms";
import { GroupsService } from "../group.service";
import { User } from "../user.model";

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
  groups: Group[] = [];
  private groupsSub: Subscription;
  private user: User;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  addListFlag: boolean = false;
  editListFlag: boolean = false;
  editLabelFlag: boolean = false;
  editGroupFlag: boolean = false;
  constructor(
    public listsService: ListsService,
    public labelsService: LabelsService,
    private authService: UsersService,
    private tasksService: TasksService,
    private groupsService: GroupsService,
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

    
    this.groupsService.getGroups();
    this.groupsSub = this.groupsService
      .getGroupsUpdateListener()
      .subscribe((groups: Group[]) => {
        this.groups = groups;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getUser();
    console.log(this.user);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        
      });
  }

  getTasksByList(list: string) {
    this.tasksService.getTasksByList(list);
  }

  // getTasksCountByList(list: string) {
  //   return this.tasksService.getTasksCountByList(list);
  // }

  // getTasksCountByLabel(label: string) {
  //   return this.tasksService.getTasksCountByLabel(label);
  //}

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
  onEditGroupClick() {
    this.editGroupFlag = !this.editGroupFlag;
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
  deleteGroup(groupId: string) {
    this.groupsService.deleteGroup(groupId);
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
