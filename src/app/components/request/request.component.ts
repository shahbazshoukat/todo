import { Component, OnInit } from "@angular/core";
import { Request } from "../request.model";
import { RequestsService } from "../request.service";
import { Subscription } from "rxjs";
import { UsersService } from "../user.service";
import { GroupsService } from "../group.service";
@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.css"]
})
export class RequestComponent implements OnInit {
  requests: Request[] = [];
  transformedRequests: any[] = [];
  private groupDetails:any;
  private requestsSub: Subscription;
  constructor(
    private requestsService: RequestsService,
    private usersService: UsersService,
    private groupsService: GroupsService
  ) {}

  ngOnInit() {
    this.requestsService.getRequests();
    this.requestsSub = this.requestsService
      .getRequestUpdateListener()
      .subscribe((requests: Request[]) => {
        this.requests = requests;
        this.requests.forEach(request => {
          let req;
          let usr;
          let grp;
          this.groupsService.getGroupById(request.groupId).subscribe(group => {
            this.groupDetails = group;
            grp = group.groups.title;
            this.usersService.getUserById(request.senderId).subscribe(user => {
              usr = user.name;
              req = {
                _id:request._id,
                sender: usr,
                group: grp,
                groupId: request.groupId
              };
              this.transformedRequests.push(req);
            });
          });
        });
        console.log(this.transformedRequests);
      });
  }

  deleteRequest(reqId: string){
    this.requestsService.deleteRequest(reqId);
  }
  acceptRequest(reqId: string, groupId: string ){
    this.groupsService.addMember(groupId);
    this.requestsService.deleteRequest(reqId);
  }
}
