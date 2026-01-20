export type CoachStatus = "aprobado" | "pendiente";

export type Coach = {
  id: string;
  fullName: string;
  documentNumber: string;
  documentType: string;
  department: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  league: string;
  club: string;
  category: string;
  categoryId: string;
  resolutionNumber: string;
  status: CoachStatus;
  registeredAt: string;
  photoUrl?: string;
};
