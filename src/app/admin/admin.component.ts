import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {UiSwitchModule} from 'ngx-ui-switch';
import {faTrash, faPlusSquare} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public trash = faTrash;
  public plus = faPlusSquare;
  public users = [];
  public messages = [];
  valueChange: false;
  constructor(private userService: UserService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getUsers();
    this.getMessages();
  }
  activateUser(identifier: string) {
    this.userService.activateUser(identifier)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success('Usuario activado correctamente');
          this.getUsers();
        }, err => {
          this.toastr.error('Ha ocurrido un error en el servidor');
          this.getUsers();
        }
      );
  }
  deleteUser(identifier: string) {
    this.userService.deleteUser(identifier)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success('Usuario borrado correctamente');
          this.getUsers();
        }, err => {
          this.toastr.error('Ha ocurrido un error en el servidor');
          this.getUsers();
        }
      );
  }
  getUsers(): void {
    this.userService.getUser()
      .pipe(first())
      .subscribe(
        res => {
          this.users = res;
        }, error => {
          this.toastr.error('Ha ocurrido un error en el servidor');
        });
  }
  getMessages(): void {
    this.userService.getMessages()
      .pipe(first())
      .subscribe(
        res => {
          this.messages = res;
        }, error => {
          this.toastr.error('Ha ocurrido un error en el servidor');
        });
  }
  changeRole(event: boolean, identifier: string): void {
    let role: string;
    role = event ? 'BRO' : 'PUB';
    this.userService.updateRole(identifier, role)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success('Usuario actualizado correctamente');
          this.getUsers();
        }, error => {
          this.toastr.error('Ha ocurrido un error en el servidor');
          this.getUsers();
        });
  }
  deleteMessage(identifier: string) {
    this.userService.deleteMessage(identifier)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success('Mensaje borrado correctamente');
          this.getMessages();
        }, err => {
          this.toastr.error('Ha ocurrido un error en el servidor');
        }
      );
  }
}
