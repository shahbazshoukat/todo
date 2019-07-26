import {List} from "./list.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';



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
    this.http.post<{message: string, listId: string}>('http://localhost:3000/api/lists', list)
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
    this.http.get<{message: string, lists: any}>('http://localhost:3000/api/lists')
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
      .delete("http://localhost:3000/api/lists/" + listId).subscribe(result => {
        console.log(result);
        this.getLists();
      });

  }

  getListById(listId: string) {
    return { ...this.lists.find(l => l._id == listId) };
  }

}


