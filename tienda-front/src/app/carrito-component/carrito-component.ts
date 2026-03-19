import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from '../models/models';
import { TiendaService } from '../services/tienda.service';
import { MatCard } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../dialogo-confirma/confirm-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-component',
  templateUrl: './carrito-component.html',
  styleUrl: './carrito-component.scss',
  imports: [MatCard, MatMiniFabButton, NgIf, NgFor, MatIcon],
})
export class CarritoComponent implements OnInit {
  carrito: ItemCarrito[] = [];

  constructor(
    private tiendaService: TiendaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.log(this.tiendaService.obtenerCarrito());

    this.tiendaService.carrito$.subscribe((data) => {
      this.carrito = data;
    });

    this.carrito = this.tiendaService.obtenerCarrito();
  }

  cambiarCantidad(index: number, cambio: number) {
    this.tiendaService.cambiarCantidad(index, cambio);
  }

  total(): number {
    return this.carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  }

  confirmarPedido() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.realizarPedido();
      }
    });
  }

  realizarPedido() {
    const request = {
      productos: this.carrito.map((item) => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
      })),
    };

    this.tiendaService.crearPedido(request).subscribe({
      next: () => {
        this.snackBar.open('Pedido realizado con éxito', 'Cerrar', {
          duration: 2000,
        });

        this.tiendaService.limpiarCarrito();

        setTimeout(() => {
          this.router.navigate(['/pedidos']);
        }, 2000);
      },
      error: () => {
        this.snackBar.open('Error al realizar el pedido', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
