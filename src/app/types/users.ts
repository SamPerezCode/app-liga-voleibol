export type UserRole =
  | "admin"
  | "liga"
  | "club"
  | "deportista"
  | "entrenador"
  | "arbitro";

export type UserStatus = "activo" | "pendiente" | "suspendido";

export type User = {
  id: string;
  username: string;
  nombre: string;
  email: string;
  telefono: string; // Telefono 1
  role: UserRole;
  status: UserStatus;
};
