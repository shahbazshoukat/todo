import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { User } from "./user.model";
import {environment} from "../../environments/environment";


const BACKEND_URL = environment.apiURL;

@Injectable({ providedIn: "root" })
export class UsersService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private user: User;
  private username: string;
  private users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.user;
  }
  getUsername() {
    return this.username;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(name: string, email: string, password: string) {
    const authData: User = {
      _id: null,
      name: name,
      email: email,
      password: password
    };
    this.http
      .post(BACKEND_URL + "signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        name: string;
        email: string;
      }>(BACKEND_URL + "login", authData)
      .subscribe(response => {
        
        const token = response.token;
        this.token = token;
        this.user = {
          _id: response.userId,
          name: response.name,
          email: response.email,
          password: ""
        };

        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(
            token,
            expirationDate,
            this.user.name,
            this.user._id
          );
          this.router.navigate(["/tasks"]);
        }
      });
     
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.username = authInformation.username;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    username: string,
    userId: string
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const username = localStorage.getItem("username");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      username: username,
      expirationDate: new Date(expirationDate)
    };
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<{ name: string; email: any }>(
      BACKEND_URL + "user" + userId
    );
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  getUsers() {
    let usr;

    this.http
      .get<{ message: string; users: any }>(BACKEND_URL + "user")
      .subscribe(responseData => {
        responseData.users.forEach(user => {
          usr = {
            _id: user._id,
            name: user.name,
            email: user.email,
            reqStatus: false
          };
          this.users.push(usr);
        });
      });
    return this.users;
  }
  getUserBId(userId: string) {
    return { ...this.users.find(u => u._id == userId) };
  }
}
