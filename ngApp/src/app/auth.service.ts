import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3001/api/register";
  private _loginUrl = "http://localhost:3001/api/login";
  private _dashboard = "http://localhost:3001/api/getAllUsers";

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  dashboard() {
    return this.http.get<any>(this._dashboard);
  }

  loggedIn() {
    // !! equal to return boolean value
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
