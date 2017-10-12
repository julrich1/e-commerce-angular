import { Headers, Http } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from "./user";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});  
  private usersUrl = 'api/users';
  private tokenUrl = 'api/token';

  public userIsLoggedIn: boolean = false;
  public user: User = new User();
  
  constructor(
    private http: Http
  ) {}

  ngOnInit(): void {
    // this.isLoggedIn().then((response) => {
    //   this.userIsLoggedIn = response;
    // });
  }

  register(user: Object): Promise<User> {
    return this.http.post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  isLoggedIn(): Promise<boolean> {
    console.log("Running isLoggedIn");
    return this.http.get(this.tokenUrl, {headers: this.headers})
      .toPromise()
      .then((response) => {
        if (response.text() === "true") {
          this.userIsLoggedIn = true;
          return true;
        }
        this.userIsLoggedIn = false;
        return false; 
      })
      .catch((err) => {
        console.log(err);
        this.userIsLoggedIn = false;        
        return false;
      });
  }

  login(userObject: object): Promise<boolean> {
    console.log(userObject);
    return this.http.post(this.tokenUrl, userObject, {headers: this.headers})
      .toPromise()
      .then((response) => {
        console.log(response);
        this.userIsLoggedIn = true;
        return true;
      })
      .catch((err) => {
        this.userIsLoggedIn = false;
        return false;
      })
  }

  logout(): Promise<boolean> {
    return this.http.delete(this.tokenUrl, {headers: this.headers})
      .toPromise()
      .then((response) => {
        console.log(response);
        this.userIsLoggedIn = false;
        // this.product
        return false;
      })
      .catch((err) => {
        console.log(err);
        return true;
      })
  }

  getUser(): Promise<void> {
    return this.http.get(this.usersUrl, {headers: this.headers})
      .toPromise()
      .then((response) => {
        this.user = response.json();
        // return response.json();
      })
  }

  updateUser(user): Promise<void> {
    return this.http.patch(this.usersUrl, user, {headers: this.headers})
      .toPromise()
      .then((response) => {
        console.log(response);
      })
  }
}