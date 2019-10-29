import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  getUser(): any {
    return this.http.get(environment.backendpoints.getUser, {
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
  deleteUser(id: string): any {
    return this.http.delete(environment.backendpoints.deleteUser + '/' + id,
      {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  activateUser(id: string): any {
    return this.http.post(environment.backendpoints.activateUser + '/' + id,
      {
        headers: {
          'cache-control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
  }
  updateRole(id: string, role: string): any {
    return this.http.post(environment.backendpoints.updateRole + '/' + id, {
      role
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
  deleteMessage(id: string): any {
    return this.http.delete(environment.backendpoints.deleteMessage + '/' + id,
      {
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
}
