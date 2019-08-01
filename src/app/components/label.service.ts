import { Label } from "./label.model";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import {environment} from "../../environments/environment";


const BACKEND_URL = environment.apiURL;

@Injectable({ providedIn: "root" })
export class LabelsService {
  private labels: any = [];
  private labelsUpdated = new Subject<Label[]>();

  constructor(private http: HttpClient) {}

  addLabel(title: string) {
    const label: Label = { _id: null, title: title };
    this.http
      .post<{ message: string; labelId: string }>(BACKEND_URL + "labels", label)
      .subscribe(responseData => {
        const id = responseData.labelId;
        label._id = id;
        console.log(responseData);
        this.labels.push(label);
        this.labelsUpdated.next([...this.labels]);
      });
  }

  getLabels() {
    this.http
      .get<{ message: string; labels: any }>(BACKEND_URL + "labels")
      .pipe(
        map(labelData => {
          return labelData.labels.map(label => {
            return {
              _id: label._id,
              title: label.title
            };
          });
        })
      )
      .subscribe(transformedLabels => {
        this.labels = transformedLabels;
        this.labelsUpdated.next([...this.labels]);
      });
  }
  getLabelUpdateListener() {
    return this.labelsUpdated.asObservable();
  }

  deleteLabel(labelId: string) {
    return this.http
      .delete(BACKEND_URL + "labels/" + labelId)
      .subscribe(result => {
        console.log(result);
        this.getLabels();
      });
  }

  getLabelById(labelId: string) {
    return { ...this.labels.find(l => l._id == labelId) };
  }
}
