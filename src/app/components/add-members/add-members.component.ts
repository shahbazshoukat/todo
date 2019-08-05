import { Component, OnInit } from "@angular/core";
import { UsersService } from "../user.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GroupsService } from "../group.service";
import { RequestsService } from "../request.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-members",
  templateUrl: "./add-members.component.html",
  styleUrls: ["./add-members.component.css"]
})
export class AddMembersComponent implements OnInit {
  addReqStatus: string;
  groupId: string;
  users: any[] = [];
  nonMembers: any[] = [];
  message: string = "";
  private group: any;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private requestsService: RequestsService
  ) {}

  ngOnInit() {
    this.users = this.usersService.getUsers();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("groupId")) {
        this.groupId = paramMap.get("groupId");
        this.groupsService.getGroupById(this.groupId).subscribe(group => {
          this.group = group.groups;

          this.users.forEach(user => {
            let index = this.group.members.find(m => m == user._id);

            if (user._id != index && user._id != this.group.userId) {
              this.nonMembers.push(user);
            }
          });
        });
      } else {
        this.groupId = null;
      }
    });
  }

  isAMember(userId: string) {
    this.group.members.forEach(member => {
      console.log(member);
      console.log(userId);
      if (member == userId) {
        return true;
      }
    });
    return false;
  }
  sendRequest(form: NgForm) {
    this.message = "";
    if (form.invalid) {
      return;
    }
    let receiver = this.users.find(u => u.email == form.value.email);
    if (receiver == undefined) {
      this.message = "Not any user with given email!";
    } else {
      let isMember = this.group.members.find(m => m == receiver._id);
      if (isMember == undefined && this.group.userId != receiver._id) {
        this.requestsService.addRequest(receiver._id, this.groupId);
        this.message = "Request sent Successfully!";
      } else {
        this.message = "User Already a member!";
      }
    }
  }
}
