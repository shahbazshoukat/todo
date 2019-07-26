import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupsService } from '../group.service';
import { UsersService } from "../user.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Member } from "../member.model";
@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {
  private group : Group;
  private groupId: string;
   members : Member[];
  constructor(private groupsService : GroupsService, private route : ActivatedRoute, private usersService : UsersService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("groupId")) {
        this.groupId = paramMap.get("groupId");
        this.groupsService.getGroupById(this.groupId).subscribe(group => {
          this.group = group.groups;
          this.group.members.forEach(member => {
            this.usersService.getUserById(member).subscribe(user => {
              console.log(user);
            })
          });
        })
      } else {
        this.groupId = null;
      }
    });
  }

}
