import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Producto } from '../models/models';
import { TiendaService } from '../services/tienda.service';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.scss',
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, MatCardImage],
})
export class InicioComponent implements OnInit {
  productos: Producto[] = [];

  constructor(
    private tiendaService: TiendaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.tiendaService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.cdr.detectChanges();
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.tiendaService.agregarAlCarrito(producto);
  }
}
