export type SolicitudStatus = "pendiente" | "aprobado" | "rechazado";

export type Solicitud = {
  id: string;
  tipo: string;
  nombre: string;
  rol: string;
  estado: SolicitudStatus;
  fecha: string;
};
