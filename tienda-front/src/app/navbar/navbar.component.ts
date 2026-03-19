import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { TiendaService } from '../services/tienda.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatToolbar, MatIcon, MatFabButton, MatBadge, RouterLink, MatTooltip],
})
export class NavbarComponent implements OnInit {
  username: string = 'Andres';
  cantidad: number = 0;

  constructor(private tiendaService: TiendaService) {}

  ngOnInit(): void {
    this.tiendaService.carrito$.subscribe((carrito) => {
      this.cantidad = carrito.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    });
  }
}
