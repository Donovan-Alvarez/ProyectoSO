import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { TiendaService } from './services/tienda.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, NavbarComponent, NgIf, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('tienda-front');

  constructor(public tiendaService: TiendaService) {}
}
