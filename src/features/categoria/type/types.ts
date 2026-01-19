export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  clubsCount: number;
  athletesCount: number;
  status: "activa" | "inactiva";
};
