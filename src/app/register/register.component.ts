import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public password1: string;
  public password2: string;

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required)
  });
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  register(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.get('username').value, this.registerForm.get('password1').value)
        .pipe(first())
        .subscribe(
          res => {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('currentUser', JSON.stringify(res.currentUser));
            this.router.navigateByUrl('/home');
          },
          err => {
            if (err.status === 400) {
              this.toastr.error('El usuario que ha introducido ya existe');
            } else {
              this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
            }
          });
    } else {
      if (this.registerForm.get('username').errors && this.registerForm.get('username').errors.email) {
        this.toastr.error('Introduzca correctamente el email');
      } else {
        this.toastr.warning('Rellene todos los campos');
      }
    }
  }
}
