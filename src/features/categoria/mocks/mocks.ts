import type { Categoria } from "../type/types";

export const categorias: Categoria[] = [
  {
    id: "cat-01",
    nombre: "Sub 13",
    descripcion: "Categoria formativa",
    clubsCount: 6,
    athletesCount: 48,
    status: "activa",
  },
  {
    id: "cat-02",
    nombre: "Sub 17",
    descripcion: "Desarrollo competitivo",
    clubsCount: 5,
    athletesCount: 40,
    status: "activa",
  },
  {
    id: "cat-03",
    nombre: "Mayores",
    descripcion: "Categoria principal",
    clubsCount: 4,
    athletesCount: 32,
    status: "inactiva",
  },
];
