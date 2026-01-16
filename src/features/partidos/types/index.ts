export type Team = {
  id: string;
  name: string;
  logoUrl?: string;
};

export type Tournament = {
  id: string;
  title: string;
  year: string;
  category: string;
};

export type MatchSet = {
  a: number;
  b: number;
};

export type MatchResult = {
  id: string;
  tournamentId: string;
  phase: string;
  group: string;
  date: string;
  time: string;
  teamA: Team;
  teamB: Team;
  sets: MatchSet[];
};

export type BracketMatch = {
  id: string;
  tournamentId: string;
  stage: "champion" | "final" | "semis" | "quarters";
  teamA: Team | null;
  teamB: Team | null;
};

export type BracketStage = {
  stage: "champion" | "final" | "semis" | "quarters";
  title: string;
  order: number;
  matches: BracketMatch[];
};
