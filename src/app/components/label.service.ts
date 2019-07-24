import {Label} from "./label.model";
import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';



@Injectable({providedIn:'root'})
export class LabelsService{
  private labels:any=[];
  private labelsUpdated = new Subject<Label[]>();

  constructor (private http: HttpClient) {}

  addLabel(title: string){
    const label: Label = {id: null, title: title};
    this.http.post<{message: string, labelId: string}>('http://localhost:3000/api/labels', label)
    .subscribe(responseData => {
      const id = responseData.labelId;
      label.id = id;
      console.log(responseData);
      this.labels.push(label);
      this.labelsUpdated.next([...this.labels]);
    })
  }

  getLabels(){
    this.http.get<{message: string, labels: any}>('http://localhost:3000/api/labels')
    .pipe(
      map(labelData =>{

        return labelData.labels.map(label =>{
          return {
            id: label._id,
            title: label.title,
          }
        })
      })
    ).subscribe(transformedLabels =>{
      this.labels = transformedLabels;
      this.labelsUpdated.next([...this.labels]);
    })
  }
  getLabelUpdateListener(){
    return this.labelsUpdated.asObservable();
  }

  deleteLabel(labelId: string) {
    return this.http
      .delete("http://localhost:3000/api/labels/" + labelId).subscribe(result => {
        console.log(result);
        this.getLabels();
      });

  }


  getLabelById(labelId : string): Observable<any>{
    return this.http.get<{message: string, labels: any}>('http://localhost:3000/api/labels' + labelId);
  }
}


