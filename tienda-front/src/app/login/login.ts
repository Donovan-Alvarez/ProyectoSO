import { Component } from '@angular/core';
import { TiendaService } from '../services/tienda.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "../material.module";

@Component({
  selector: 'app-login',
  imports: [FormsModule, MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hide: boolean = true;
  user = { email: '', password: '' };

  constructor(private authService: TiendaService, private router: Router) {}

  onSubmit() {
    console.log('Intentando login con', this.user);
    this.authService.login(this.user).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        this.router.navigate(['/inicio']); // Redirigir a la tienda
      },
      error: (err) => {
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
