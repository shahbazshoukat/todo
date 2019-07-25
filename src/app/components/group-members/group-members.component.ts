import { Component, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupsService } from '../group.service';
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
  private members : Member[];
  constructor(private groupsService : GroupsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("groupId")) {
        this.groupId = paramMap.get("groupId");
        this.groupsService.getGroupById(this.groupId).subscribe(group => {
          this.group = group.groups;
          this.group.members.forEach(member => {
            //start from here
          });
        })
      } else {
        this.groupId = null;
      }
    });
  }

}
