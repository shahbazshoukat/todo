import { Request } from "./request.model";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiURL;

@Injectable({ providedIn: "root" })
export class RequestsService {
  private requests: any = [];
  private requestsUpdated = new Subject<Request[]>();

  constructor(private http: HttpClient) {}

  addRequest(receiverId: string, groupId: string) {
    const request: Request = {
      _id: null,
      senderId: null,
      receiverId: receiverId,
      groupId: groupId
    };
    this.http
      .post<{ message: string; requestId: string }>(
        BACKEND_URL + "requests",
        request
      )
      .subscribe(responseData => {
        const id = responseData.requestId;
        request._id = id;
        console.log(responseData);
        this.requests.push(request);
        this.requestsUpdated.next([...this.requests]);
      });
  }

  getRequests() {
    this.http
      .get<{ message: string; requests: any }>(BACKEND_URL + "requests")
      .pipe(
        map(requestData => {
          return requestData.requests.map(request => {
            return {
              _id: request._id,
              senderId: request.senderId,
              receiverId: request.receiverId,
              groupId: request.groupId
            };
          });
        })
      )
      .subscribe(transformedRequests => {
        this.requests = transformedRequests;
        this.requestsUpdated.next([...this.requests]);
      });
  }
  getRequestUpdateListener() {
    return this.requestsUpdated.asObservable();
  }

  deleteRequest(requestId: string) {
    return this.http
      .delete(BACKEND_URL + "requests/" + requestId)
      .subscribe(result => {
        console.log(result);

        const updatedRequests = this.requests.filter(
          req => req._id !== requestId
        );
        this.requests = updatedRequests;
        this.requestsUpdated.next([...this.requests]);
      });
  }

  getRequestById(requestId: string) {
    return { ...this.requests.find(req => req._id == requestId) };
  }
}
