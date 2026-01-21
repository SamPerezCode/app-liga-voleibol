export type ChampionshipStatus =
  | "finalizado"
  | "en-curso"
  | "programado";

export type Championship = {
  id: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  category: string;
  status: ChampionshipStatus;
  registered: boolean;
  enrollmentOpen: boolean;
};

export type ChampionshipRegistration = {
  id: string;
  championshipId: string;
  president: string;
  secretary: string;
  delegate: string;
  coach: string;
  doctor: string;
  assistantCoach: string;
  physicalTrainer: string;
};

export type ChampionshipPlayer = {
  id: string;
  championshipId: string;
  stage: "preinscrito" | "inscrito";
  fullName: string;
  documentNumber: string;
  birthDate: string;
  club: string;
  category: string;
  position: string;
  status: "aprobado" | "pendiente";
  jerseyNumber?: string;
  photoUrl?: string;
};

export type ChampionshipClubRegistration = {
  id: string;
  championshipId: string;
  clubId: string;
};
