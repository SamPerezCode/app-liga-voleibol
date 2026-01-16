import type { Tournament, MatchResult, BracketStage } from "../types";

const team = (id: string, name: string) => ({ id, name });

export const tournaments: Tournament[] = [
  {
    id: "t-2025-01",
    title: "Partidos 2025",
    year: "2025",
    category: "General",
  },
  {
    id: "t-2025-02",
    title: "Nacional Sub-15 Femenino",
    year: "2025",
    category: "Sub-15",
  },
  {
    id: "t-2025-03",
    title: "Nacional Mayores Masculino",
    year: "2025",
    category: "Mayores",
  },
];

export const matchResults: MatchResult[] = [
  {
    id: "m-001",
    tournamentId: "t-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo A",
    date: "07/07/2025",
    time: "08:00 a.m.",
    teamA: team("t-cor", "Cordoba"),
    teamB: team("t-san", "Santander"),
    sets: [
      { a: 25, b: 21 },
      { a: 25, b: 16 },
      { a: 25, b: 22 },
    ],
  },
  {
    id: "m-002",
    tournamentId: "t-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo A",
    date: "07/07/2025",
    time: "08:00 a.m.",
    teamA: team("t-nsa", "Norte de Santander"),
    teamB: team("t-cas", "Casanare"),
    sets: [
      { a: 16, b: 25 },
      { a: 20, b: 25 },
      { a: 16, b: 25 },
    ],
  },
  {
    id: "m-003",
    tournamentId: "t-2025-01",
    phase: "Fase de Grupos",
    group: "Grupo C",
    date: "07/07/2025",
    time: "09:30 a.m.",
    teamA: team("t-hui", "Huila"),
    teamB: team("t-ant", "Antioquia"),
    sets: [
      { a: 14, b: 25 },
      { a: 13, b: 25 },
      { a: 20, b: 25 },
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
        tournamentId: "t-2025-01",
        stage: "champion",
        teamA: null,
        teamB: null,
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
        tournamentId: "t-2025-01",
        stage: "final",
        teamA: team("t-ant", "Antioquia"),
        teamB: team("t-val", "Valle del Cauca"),
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
        tournamentId: "t-2025-01",
        stage: "semis",
        teamA: team("t-val", "Valle del Cauca"),
        teamB: team("t-qui", "Quindio"),
      },
      {
        id: "b-semi-2",
        tournamentId: "t-2025-01",
        stage: "semis",
        teamA: team("t-ant", "Antioquia"),
        teamB: team("t-bol", "Bolivar"),
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
        tournamentId: "t-2025-01",
        stage: "quarters",
        teamA: team("t-qui", "Quindio"),
        teamB: team("t-bog", "Bogota D.C."),
      },
      {
        id: "b-q-2",
        tournamentId: "t-2025-01",
        stage: "quarters",
        teamA: team("t-ant", "Antioquia"),
        teamB: team("t-san", "Santander"),
      },
      {
        id: "b-q-3",
        tournamentId: "t-2025-01",
        stage: "quarters",
        teamA: team("t-val", "Valle del Cauca"),
        teamB: team("t-ris", "Risaralda"),
      },
      {
        id: "b-q-4",
        tournamentId: "t-2025-01",
        stage: "quarters",
        teamA: team("t-bol", "Bolivar"),
        teamB: team("t-cas", "Casanare"),
      },
    ],
  },
];
