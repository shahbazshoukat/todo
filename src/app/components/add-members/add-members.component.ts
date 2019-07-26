import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  users : any[] = [];
  constructor(private usersService : UsersService) { }

  ngOnInit() {
  this.users = this.usersService.getUsers();
  console.log(this.users);
    
  }

}
