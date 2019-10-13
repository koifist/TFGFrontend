import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
        .pipe(first())
        .subscribe(
          res => {
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('currentUser', JSON.stringify(res.currentUser));
            this.router.navigateByUrl('/home');
          }, err => {
            if (err.status === 405) {
              this.toastr.error('Tu correo electrónico o la contraseña son incorrectos. Inténtalo de nuevo');
            } else {
              this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
            }
          });
    } else {
      if (this.loginForm.get('username').errors && this.loginForm.get('username').errors.email) {
        this.toastr.error('Introduce correctamente el email');
      } else {
        this.toastr.warning('Introduce usuario y contraseña');
      }
    }
  }
}
