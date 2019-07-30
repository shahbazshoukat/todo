import { Component, OnInit } from "@angular/core";
import { Group } from "../group.model";
import { GroupsService } from "../group.service";
import { UsersService } from "../user.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Member } from "../member.model";
import { Subject, Subscription } from "rxjs";
@Component({
  selector: "app-group-members",
  templateUrl: "./group-members.component.html",
  styleUrls: ["./group-members.component.css"]
})
export class GroupMembersComponent implements OnInit {
  private group: Group;
  groupAdmin: string;
  loggedInUser: string;
  groupId: string;
  members: Member[] = [];
  members2: Member[] = [];
  private memberssSub: Subscription;
  private membersUpdated = new Subject<Member[]>();
  constructor(
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("groupId")) {
        this.groupId = paramMap.get("groupId");
        this.getMembers(this.groupId);
        this.memberssSub = this.getMembersUpdateListener().subscribe(
          (members: Member[]) => {
            this.members2 = members;
          }
        );
      } else {
        this.groupId = null;
      }
    });
  }

  getMembers(grpId) {
    this.members = [];
    this.groupsService.getGroupById(grpId).subscribe(group => {
      this.group = group.groups;
      this.usersService.getUserById(group.groups.userId).subscribe(user => {
        let mbr: Member;
        this.groupAdmin = group.groups.userId;
        this.loggedInUser = this.usersService.getUserId();
        mbr = {
          _id: group.groups.userId,
          name: user.name,
          email: user.email
        };
        this.members.push(mbr);
      });
      if (this.group.members.length > 0) {
        this.group.members.forEach(member => {
          this.usersService.getUserById(member).subscribe(user => {
            let mbr: Member;
            mbr = {
              _id: member,
              name: user.name,
              email: user.email
            };
            this.members.push(mbr);
          });
        });
      }
      this.membersUpdated.next([...this.members]);
    });
  }
  getMembersUpdateListener() {
    return this.membersUpdated.asObservable();
  }
  removeMember(grpId: string, memId: string) {
    this.groupsService.removeMember(grpId, memId);
    this.getMembers(grpId);
    this.memberssSub = this.getMembersUpdateListener().subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
  }
}
