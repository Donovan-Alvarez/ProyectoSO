import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registroForm: FormGroup;
  hide = true; // Para mostrar/ocultar contraseña

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // Recuerda que Nginx redirigirá /api a tu backend
      this.http.post('/api/auth/register', this.registroForm.value).subscribe({
        next: (res) => {
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar. El correo podría ya estar en uso.');
        }
      });
    }
  }
}
