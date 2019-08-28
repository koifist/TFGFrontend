import {Component, DoCheck, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , DoCheck {
  faUser = faUser;
  public user: any;
  constructor(private userService: UserService) { }

  ngDoCheck(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    } else {
      this.user = '';
    }
    }
  ngOnInit() {
    moment.locale('es');
  }
  logOut(): void {
    this.userService.logOut();
  }
}
