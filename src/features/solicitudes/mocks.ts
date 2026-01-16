import type { Solicitud } from "./types/solicitudes";

export const solicitudes: Solicitud[] = [
  {
    id: "sol-001",
    tipo: "Registro",
    nombre: "Club Deportivo Norte",
    rol: "Club",
    estado: "pendiente",
    fecha: "16/01/2026",
  },
  {
    id: "sol-002",
    tipo: "Inscripcion",
    nombre: "Laura Pineda",
    rol: "Deportista",
    estado: "aprobado",
    fecha: "15/01/2026",
  },
  {
    id: "sol-003",
    tipo: "Registro",
    nombre: "Miguel Rojas",
    rol: "Entrenador",
    estado: "rechazado",
    fecha: "14/01/2026",
  },
];
