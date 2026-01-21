import type {
  Championship,
  ChampionshipClubRegistration,
  ChampionshipPlayer,
  ChampionshipRegistration,
} from "../types";

export const championships: Championship[] = [
  {
    id: "ch-001",
    name: "LXIV Campeonato Nacional Sub-15",
    city: "Pereira",
    startDate: "2025-11-30",
    endDate: "2025-11-30",
    category: "Sub-15 (2010-2011)",
    status: "finalizado",
    registered: true,
    enrollmentOpen: false,
  },
  {
    id: "ch-002",
    name: "LXIII Campeonato Nacional Sub-19 Femenino",
    city: "Cartagena",
    startDate: "2025-09-08",
    endDate: "2025-09-14",
    category: "Sub-19 (2006-2007)",
    status: "finalizado",
    registered: true,
    enrollmentOpen: false,
  },
  {
    id: "ch-003",
    name: "LIX Campeonato Nacional Mayores Masculino",
    city: "Medellin",
    startDate: "2025-05-17",
    endDate: "2025-05-23",
    category: "Mayores (2003 hacia atras)",
    status: "finalizado",
    registered: true,
    enrollmentOpen: false,
  },
  {
    id: "ch-004",
    name: "LXVI Campeonato Nacional Sub-17",
    city: "Cali",
    startDate: "2026-03-10",
    endDate: "2026-03-16",
    category: "Sub-17 (2008-2009)",
    status: "programado",
    registered: false,
    enrollmentOpen: true,
  },
];

export const championshipClubRegistrations: ChampionshipClubRegistration[] =
  [
    {
      id: "cc-001",
      championshipId: "ch-001",
      clubId: "club-001",
    },
    {
      id: "cc-002",
      championshipId: "ch-001",
      clubId: "club-002",
    },
    {
      id: "cc-003",
      championshipId: "ch-002",
      clubId: "club-001",
    },
    {
      id: "cc-004",
      championshipId: "ch-004",
      clubId: "club-003",
    },
  ];

export const registrations: ChampionshipRegistration[] = [
  {
    id: "reg-191",
    championshipId: "ch-001",
    president: "Fernando David Lopez Zapata",
    secretary: "Laura Marcela Velasquez Alvarado",
    delegate: "xxxx",
    coach: "Arelys Adriana Caldera Martinez",
    doctor: "xx",
    assistantCoach: "Arelys Adriana Caldera Martinez",
    physicalTrainer: "xxx",
  },
];

export const championshipPlayers: ChampionshipPlayer[] = [
  {
    id: "pl-001",
    championshipId: "ch-001",
    stage: "preinscrito",
    fullName: "Evelyn Galvis Quintero",
    documentNumber: "1066289576",
    birthDate: "2011-06-02",
    club: "Club de Voleibol Academia Mas Voley",
    category: "Sub-15 (2010-2011)",
    position: "Armador",
    status: "aprobado",
    photoUrl: "/athlete-2.jpg",
  },
  {
    id: "pl-002",
    championshipId: "ch-001",
    stage: "preinscrito",
    fullName: "Nathalya Isabel Arzuaga Lopez",
    documentNumber: "1067613473",
    birthDate: "2010-12-05",
    club: "Club Deportivo Valkiria",
    category: "Sub-15 (2010-2011)",
    position: "Punta/Receptor",
    status: "aprobado",
    photoUrl: "/athlete-3.jpg",
  },
  {
    id: "pl-003",
    championshipId: "ch-001",
    stage: "inscrito",
    fullName: "Sharith Garcia Musa",
    documentNumber: "1066287412",
    birthDate: "2010-07-17",
    club: "Club de Voleibol Academia Mas Voley",
    category: "Sub-15 (2010-2011)",
    position: "Libero",
    status: "aprobado",
    jerseyNumber: "13",
    photoUrl: "/athlete-4.jpg",
  },
];
