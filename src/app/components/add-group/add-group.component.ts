import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupsService } from '../group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private groupsService : GroupsService) { }

  ngOnInit() {
  }

  onAddGroup(form : NgForm){
    if(form.invalid){
      return;
    }
    this.groupsService.addGroup(form.value.title);

    form.resetForm();
  }

}
