import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.nuevoUsuario(this.usuario)
        .subscribe( resp => {

          console.log(resp);
          Swal.close();

          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
          } else {
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/home');

        }, (err) => {

          console.log(err.error.error.message);
          Swal.fire({
            title: 'Error al registrar',
            type: 'error',
            text: err.error.error.message
          });

        });

  }

}
