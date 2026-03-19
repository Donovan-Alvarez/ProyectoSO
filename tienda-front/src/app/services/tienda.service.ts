import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarrito, LoginResponse, Producto } from '../models/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private urlBase = '/api';

  private carrito: ItemCarrito[] = [];

  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarCarritoInicial(); // 🔥 clave
  }

  //LOGIN
  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlBase}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      }),
    );
  }

  //PRODUCTOS
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlBase}/producto`);
  }

  // CARRITO

  private cargarCarritoInicial() {
    const data = localStorage.getItem('carrito');
    this.carrito = data ? JSON.parse(data) : [];
    this.carritoSubject.next(this.carrito);
  }

  obtenerCarrito(): ItemCarrito[] {
    return this.carrito;
  }

  agregarAlCarrito(producto: Producto) {
    const index = this.carrito.findIndex((item) => item.producto.id === producto.id);

    if (index !== -1) {
      this.carrito[index].cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1 });
    }

    this.guardar();
  }

  cambiarCantidad(index: number, cambio: number) {
    if (!this.carrito[index]) return;

    this.carrito[index].cantidad += cambio;

    if (this.carrito[index].cantidad <= 0) {
      this.carrito.splice(index, 1);
    }

    this.guardar();
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.guardar();
  }

  limpiarCarrito() {
    this.carrito = [];
    this.guardar();
  }

  private guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.carritoSubject.next([...this.carrito]); // 🔥 copia para asegurar cambio
  }

  // PEDIDO
  crearPedido(request: any): Observable<any> {
    return this.http.post(`${this.urlBase}/pedidos`, request);
  }
}
