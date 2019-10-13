import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  upgradeBroker(username: string): any {
    return this.http.post(environment.backendpoints.upgradeBroker, {
      username
    }, {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
  }
  sendMessage(msg: string): any {
    return this.http.post(environment.backendpoints.sendMessage, {
      msg
      }, {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
  }
  getMessages(): any {
    return this.http.get(environment.backendpoints.getMessages, {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  getStockInfo(): any {
    return this.http.get(environment.backendpoints.getStockInfo, {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
  }
  getStockHistory(): any {
    return this.http.get(environment.backendpoints.getStockHistory, {
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
  }
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
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
      this.router.navigateByUrl('/home');
    }
}
