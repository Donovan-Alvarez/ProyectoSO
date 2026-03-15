export interface LoginResponse {
  token: string;
}

export interface UsuarioRegistro {
  nombre: string;
  email: string;
  password?: string;
}