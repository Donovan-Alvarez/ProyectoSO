export interface LoginResponse {
  token: string;
}

export interface UsuarioRegistro {
  nombre: string;
  email: string;
  password?: string;
}

export interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  id: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
