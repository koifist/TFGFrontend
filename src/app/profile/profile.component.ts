import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public password1: string;
  public password2: string;

  public updatepassForm = new FormGroup({
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required)
  });
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  updatePass(): void {
    if (this.updatepassForm.valid) {
      this.userService.updatePass(this.updatepassForm.get('password1').value)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.success('Contraseña cambiada correctamente');
            this.router.navigateByUrl('/home');
          },
          err => {
            if (err.status === 401) {
              this.toastr.info('Su sesión ha expirado, inicie sesión nuevamente');
              this.userService.logOut();
            } else {
              this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
            }
          });
    } else {
        this.toastr.warning('Rellene todos los campos');
      }
  }
}
