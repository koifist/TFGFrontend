import {Component, DoCheck, OnInit} from '@angular/core';
import { faHome} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , DoCheck {
  faHome = faHome;
  public user: any;
  constructor() { }

  ngDoCheck(): void {
    if (localStorage.getItem('tfg_token')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      }
    }
  ngOnInit() {
  }

}
