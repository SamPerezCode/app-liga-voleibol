import type { Tournament, MatchResult, BracketStage } from "../types";

const team = (id: string, name: string) => ({ id, name });

export const tournaments: Tournament[] = [
  {
    id: "t-ces-2025-01",
    title: "Liga Cesar 2025",
    year: "2025",
    category: "Mayores",
    city: "Valledupar",
    dateRange: "Mar - Jun 2025",
    status: "en-curso",
  },
  {
    id: "t-ces-2025-02",
    title: "Copa Sub-17 Cesar",
    year: "2025",
    category: "Sub-17",
    city: "Aguachica",
    dateRange: "Jul - Ago 2025",
    status: "programado",
  },
  {
    id: "t-ces-2025-03",
    title: "Festival Sub-15 Cesar",
    year: "2025",
    category: "Sub-15",
    city: "Bosconia",
    dateRange: "Sep 2025",
    status: "programado",
  },
  {
    id: "t-ces-2024-04",
    title: "Superliga Cesar 2024",
    year: "2024",
    category: "General",
    city: "Valledupar",
    dateRange: "Nov 2024",
    status: "finalizado",
  },
];

export const matchResults: MatchResult[] = [
  {
    id: "m-001",
    tournamentId: "t-ces-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo A",
    date: "07/07/2025",
    time: "08:00 a.m.",
    teamA: team("t-val", "Valledupar"),
    teamB: team("t-agu", "Aguachica"),
    sets: [
      { a: 25, b: 21 },
      { a: 22, b: 25 },
      { a: 15, b: 13 },
    ],
  },
  {
    id: "m-002",
    tournamentId: "t-ces-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo A",
    date: "07/07/2025",
    time: "09:30 a.m.",
    teamA: team("t-bos", "Bosconia"),
    teamB: team("t-cod", "Agustin Codazzi"),
    sets: [
      { a: 25, b: 18 },
      { a: 25, b: 20 },
    ],
  },
  {
    id: "m-003",
    tournamentId: "t-ces-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo B",
    date: "08/07/2025",
    time: "10:00 a.m.",
    teamA: team("t-cur", "Curumani"),
    teamB: team("t-eco", "El Copey"),
    sets: [
      { a: 19, b: 25 },
      { a: 25, b: 20 },
      { a: 12, b: 15 },
    ],
  },
  {
    id: "m-004",
    tournamentId: "t-ces-2025-02",
    phase: "Fase de Grupos",
    group: "Grupo A",
    date: "20/07/2025",
    time: "08:00 a.m.",
    teamA: team("t-lji", "La Jagua de Ibirico"),
    teamB: team("t-lpz", "La Paz"),
    sets: [
      { a: 21, b: 25 },
      { a: 25, b: 23 },
      { a: 13, b: 15 },
    ],
  },
  {
    id: "m-005",
    tournamentId: "t-ces-2025-02",
    phase: "Fase de Grupos",
    group: "Grupo B",
    date: "20/07/2025",
    time: "09:30 a.m.",
    teamA: team("t-sda", "San Alberto"),
    teamB: team("t-sdi", "San Diego"),
    sets: [
      { a: 25, b: 19 },
      { a: 25, b: 21 },
    ],
  },
  {
    id: "m-006",
    tournamentId: "t-ces-2025-03",
    phase: "Eliminatoria",
    group: "Llaves",
    date: "10/09/2025",
    time: "09:00 a.m.",
    teamA: team("t-pai", "Pailitas"),
    teamB: team("t-pbe", "Pueblo Bello"),
    sets: [
      { a: 25, b: 23 },
      { a: 18, b: 25 },
      { a: 15, b: 10 },
    ],
  },
];

export const bracketStages: BracketStage[] = [
  {
    stage: "champion",
    title: "Campeon",
    order: 0,
    matches: [
      {
        id: "b-champ-1",
        tournamentId: "t-ces-2025-01",
        stage: "champion",
        teamA: team("t-val", "Valledupar"),
        teamB: team("t-bos", "Bosconia"),
      },
    ],
  },
  {
    stage: "final",
    title: "Finales",
    order: 1,
    matches: [
      {
        id: "b-final-1",
        tournamentId: "t-ces-2025-01",
        stage: "final",
        teamA: team("t-agu", "Aguachica"),
        teamB: team("t-val", "Valledupar"),
      },
    ],
  },
  {
    stage: "semis",
    title: "Semifinales",
    order: 2,
    matches: [
      {
        id: "b-semi-1",
        tournamentId: "t-ces-2025-01",
        stage: "semis",
        teamA: team("t-val", "Valledupar"),
        teamB: team("t-cur", "Curumani"),
      },
      {
        id: "b-semi-2",
        tournamentId: "t-ces-2025-01",
        stage: "semis",
        teamA: team("t-agu", "Aguachica"),
        teamB: team("t-bos", "Bosconia"),
      },
    ],
  },
  {
    stage: "quarters",
    title: "Cuartos de Final",
    order: 3,
    matches: [
      {
        id: "b-q-1",
        tournamentId: "t-ces-2025-01",
        stage: "quarters",
        teamA: team("t-eco", "El Copey"),
        teamB: team("t-cod", "Agustin Codazzi"),
      },
      {
        id: "b-q-2",
        tournamentId: "t-ces-2025-01",
        stage: "quarters",
        teamA: team("t-lji", "La Jagua de Ibirico"),
        teamB: team("t-lpz", "La Paz"),
      },
    ],
  },
];
