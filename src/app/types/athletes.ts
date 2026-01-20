export type Athlete = {
  id: string;
  fullName: string;
  birthDate: string;
  birthDept: string;
  birthCity: string;
  residenceDept: string;
  residenceCity: string;
  neighborhood: string;
  address: string;
  heightCm: number;
  weightKg: number;
  bloodType: string;
  gender: "Masculino" | "Femenino";
  position: string;
  phone: string;
  email: string;
  documentType: string;
  documentNumber: string;
  club: string;
  category: string;
  categoryId: string;
  photoUrl?: string;
  status: "aprobado" | "pendiente";
  payment: "pagado" | "pendiente";
  registeredAt: string;
};

export const athleteDetailOrder = [
  "fullName",
  "birthDept",
  "residenceDept",
  "neighborhood",
  "heightCm",
  "bloodType",
  "club",
  "category",
  "documentType",
  "email",
  "birthDate",
  "birthCity",
  "residenceCity",
  "address",
  "weightKg",
  "gender",
  "position",
  "phone",
  "documentNumber",
] as const;
