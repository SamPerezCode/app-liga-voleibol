import { useMemo, useState } from "react";
import { tournaments, matchResults, bracketStages } from "../mocks";
import TournamentCard from "../components/TournamentCard";
import PartidosDetalle from "../components/PartidosDetalle";
import type { Tournament } from "../types";

const PartidosPage = () => {
  const [selected, setSelected] = useState<Tournament | null>(null);

  const totalMatches = matchResults.length;
  const totalEvents = tournaments.length;
  const totalSedes = new Set(tournaments.map((t) => t.city)).size;

  const nextMatch = matchResults[0] ?? null;
  const nextTournament = nextMatch
    ? tournaments.find((t) => t.id === nextMatch.tournamentId)
    : null;

  const matchesCount = useMemo(() => {
    const map = new Map<string, number>();
    tournaments.forEach((t) => {
      map.set(
        t.id,
        matchResults.filter((m) => m.tournamentId === t.id).length
      );
    });
    return map;
  }, [tournaments, matchResults]);

  if (selected) {
    return (
      <PartidosDetalle
        tournament={selected}
        results={matchResults.filter(
          (m) => m.tournamentId === selected.id
        )}
        bracket={bracketStages.filter((b) =>
          b.matches.some((m) => m.tournamentId === selected.id)
        )}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-league-400/10 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-600">
              Liga del Cesar
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              Calendario de Partidos
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Vista general de competencias, sedes y resultados en el
              departamento del Cesar.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Partidos
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">
                  {totalMatches}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Sedes
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">
                  {totalSedes}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Eventos
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">
                  {totalEvents}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Proximo partido
          </div>

          {nextMatch && nextTournament ? (
            <div className="mt-4 space-y-4">
              <div className="text-lg font-semibold text-slate-800">
                {nextMatch.teamA.name} vs {nextMatch.teamB.name}
              </div>
              <div className="text-xs text-slate-500">
                {nextTournament.title} · {nextMatch.phase}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700">
                {nextMatch.date} · {nextMatch.time}
              </div>
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold text-league-700"
                onClick={() => setSelected(nextTournament)}
              >
                Ver calendario
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="mt-4 text-sm text-slate-500">
              No hay partidos programados.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Competencias
        </h2>
        <span className="text-xs text-slate-500">
          {totalEvents} eventos activos
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((t) => (
          <TournamentCard
            key={t.id}
            item={t}
            matchesCount={matchesCount.get(t.id) ?? 0}
            onClick={() => setSelected(t)}
          />
        ))}
      </div>
    </section>
  );
};

export default PartidosPage;
