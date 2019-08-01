import {List} from "./list.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {environment} from "../../environments/environment";


const BACKEND_URL = environment.apiURL;

@Injectable({providedIn:'root'})
export class ListsService{
  private lists:any=[];
  private listsUpdated = new Subject<List[]>();
  listBtnClick: boolean = false;

  constructor (private http: HttpClient) {}

  setListBtnClick(value: boolean){
    this.listBtnClick=value;
  }

  getListBtnClick(){
    return this.listBtnClick;
  }


  addList(title: string){
    const list: List = {_id: null, title: title};
    this.http.post<{message: string, listId: string}>(BACKEND_URL + 'lists', list)
    .subscribe(responseData => {
      console.log(responseData);
      const id = responseData.listId;
      list._id = id;
      console.log(list);
      this.lists.push(list);
      this.listsUpdated.next([...this.lists]);
    })
  }

  getLists(){
    this.http.get<{message: string, lists: any}>(BACKEND_URL + 'lists')
    .pipe(
      map(listData =>{
        return listData.lists.map(list =>{
          return {
            _id: list._id,
            title: list.title,
          }
        })
      })
    ).subscribe(transformedLists =>{
      this.lists = transformedLists;
      this.listsUpdated.next([...this.lists]);
    })
  }
  getListUpdateListener(){
    return this.listsUpdated.asObservable();
  }

  deleteList(listId: string) {
    return this.http
      .delete(BACKEND_URL + "lists/" + listId).subscribe(result => {
        console.log(result);
        this.getLists();
      });

  }

  getListById(listId: string) {
    return { ...this.lists.find(l => l._id == listId) };
  }

}


