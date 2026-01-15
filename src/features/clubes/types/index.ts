export type ClubStatus = "aprobado" | "pendiente";
export type PaymentStatus = "pagado" | "pendiente";

export type Club = {
  id: string;
  nombre: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  telefono1: string;
  telefono2?: string;
  presidente: string;
  correo: string;
  liga: string;
  estado: ClubStatus;
  pago: PaymentStatus;
  logoUrl?: string;
};

export type ClubDocument = {
  id: string;
  clubId: string;
  tipo: string;
  estado: ClubStatus;
};

export type ClubAthleteRow = {
  id: string;
  clubId: string;
  nombre: string;
  documento: string;
  categoria: string;
  estado: ClubStatus;
  pago: PaymentStatus;
  fechaRegistro: string;
  fotoUrl?: string;
};

export type ClubCoachRow = {
  id: string;
  clubId: string;
  nombre: string;
  documento: string;
  liga: string;
  club: string;
  estado: ClubStatus;
  fechaRegistro: string;
  fotoUrl?: string;
};
