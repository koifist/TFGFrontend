import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  login(username: string, password: string): any {
    return this.http.post(environment.backendpoints.login,
      {
        username,
        password
      }, {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  register(username: string, password: string): any {
    return this.http.post(environment.backendpoints.register,
      {
        username,
        password
      }, {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  updatePass(password: string): any {
    return this.http.post(environment.backendpoints.updatePass,
      {
        password
      }, {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  logOut(): any {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }
}
