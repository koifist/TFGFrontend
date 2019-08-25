import {Component, DoCheck, OnInit} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';

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
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.user = '';
    }
    }
  ngOnInit() {
  }
  logOut(): void {
    this.userService.logOut();
  }
}
