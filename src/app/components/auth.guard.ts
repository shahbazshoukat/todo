import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
  ParamMap
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UsersService } from "./user.service";
import { GroupsService } from "./group.service";
import { Group } from './group.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UsersService,
    private groupsService: GroupsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    let isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(["/login"]);
    }
    if (route.paramMap.has("groupId")) {
      const id = route.params.groupId;
      this.groupsService.getGroups();
      this.groupsService.getGroupsUpdateListener().subscribe((groups: Group[]) => {
        for (let group of groups) {
          if (id == group._id) {
            return true;
          }
        }
        this.router.navigate(["/tasks"]);
        return false;
      });
     
    }
    return isAuth;
  }
}
