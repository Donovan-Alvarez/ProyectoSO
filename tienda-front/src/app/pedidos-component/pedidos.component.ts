import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TiendaService } from '../services/tienda.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
  imports: [NgFor, NgIf, MatCard, MatCardContent],
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(
    private tiendaService: TiendaService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.tiendaService.getMisPedidos().subscribe((data) => {
      this.pedidos = data;
      this.cdr.detectChanges();
    });
  }
}
