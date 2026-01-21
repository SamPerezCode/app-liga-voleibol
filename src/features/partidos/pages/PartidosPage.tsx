import { useMemo, useState } from "react";
import { tournaments, matchResults, bracketStages } from "../mocks";
import TournamentCard from "../components/TournamentCard";
import PartidosDetalle from "../components/PartidosDetalle";
import type { MatchResult, Tournament } from "../types";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";
import ResetButton from "../../../ui/ResetButton";
import Modal from "../../../ui/Modal";
import Pagination from "../../../ui/Pagination";

const emptyFilters = {
  team: "todos",
  tournament: "todos",
  year: "todos",
  status: "todos",
};

const PartidosPage = () => {
  const [selected, setSelected] = useState<Tournament | null>(null);
  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [filters, setFilters] = useState(emptyFilters);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");

  const [page, setPage] = useState(1);
  const pageSize = 4;
  const teamOptions = useMemo(() => {
    const set = new Set<string>();
    matchResults.forEach((m) => {
      set.add(m.teamA.name);
      set.add(m.teamB.name);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const yearOptions = useMemo(() => {
    const set = new Set(tournaments.map((t) => t.year));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, []);

  const activeTournaments = useMemo(
    () => tournaments.filter((t) => t.status === "en-curso"),
    []
  );

  const activeTournamentIds = useMemo(
    () => new Set(activeTournaments.map((t) => t.id)),
    [activeTournaments]
  );

  const activeMatches = useMemo(
    () =>
      matchResults.filter((m) =>
        activeTournamentIds.has(m.tournamentId)
      ),
    [activeTournamentIds]
  );

  const activeMatchesByTournament = useMemo(() => {
    const map = new Map<string, MatchResult[]>();
    activeMatches.forEach((match) => {
      const list = map.get(match.tournamentId) ?? [];
      list.push(match);
      map.set(match.tournamentId, list);
    });
    return map;
  }, [activeMatches]);

  const statusOptions = [
    { id: "todos", label: "Todos" },
    { id: "en-curso", label: "En curso" },
    { id: "programado", label: "Programado" },
    { id: "finalizado", label: "Finalizado" },
  ];

  const tournamentsByFilters = useMemo(() => {
    return tournaments.filter((t) => {
      if (
        filters.tournament !== "todos" &&
        t.id !== filters.tournament
      ) {
        return false;
      }

      if (filters.year !== "todos" && t.year !== filters.year) {
        return false;
      }

      if (filters.team !== "todos") {
        const hasTeam = matchResults.some(
          (m) =>
            m.tournamentId === t.id &&
            (m.teamA.name === filters.team ||
              m.teamB.name === filters.team)
        );
        if (!hasTeam) return false;
      }

      return true;
    });
  }, [filters]);

  const statusCounts = useMemo(() => {
    const counts = {
      todos: tournamentsByFilters.length,
      "en-curso": 0,
      programado: 0,
      finalizado: 0,
    };

    tournamentsByFilters.forEach((t) => {
      counts[t.status] += 1;
    });

    return counts;
  }, [tournamentsByFilters]);

  const filteredTournaments = useMemo(() => {
    if (statusFilter === "todos") return tournamentsByFilters;
    return tournamentsByFilters.filter(
      (t) => t.status === statusFilter
    );
  }, [tournamentsByFilters, statusFilter]);

  const filteredMatches = useMemo(() => {
    return matchResults.filter((m) => {
      if (
        filters.tournament !== "todos" &&
        m.tournamentId !== filters.tournament
      ) {
        return false;
      }

      if (filters.team !== "todos") {
        const hasTeam =
          m.teamA.name === filters.team ||
          m.teamB.name === filters.team;
        if (!hasTeam) return false;
      }

      const tournament = tournaments.find(
        (t) => t.id === m.tournamentId
      );
      if (!tournament) return false;

      if (
        filters.year !== "todos" &&
        tournament.year !== filters.year
      ) {
        return false;
      }

      if (
        statusFilter !== "todos" &&
        tournament.status !== statusFilter
      ) {
        return false;
      }

      return true;
    });
  }, [filters, statusFilter]);

  const pagedTournaments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTournaments.slice(start, start + pageSize);
  }, [filteredTournaments, page, pageSize]);

  const activeMatchesCount = activeMatches.length;
  const activeEventsCount = activeTournaments.length;
  const activeSedesCount = new Set(
    activeTournaments.map((t) => t.city)
  ).size;

  const nextActiveMatch = activeMatches[0] ?? null;
  const nextActiveTournament = nextActiveMatch
    ? activeTournaments.find(
        (t) => t.id === nextActiveMatch.tournamentId
      )
    : null;

  const matchesCount = useMemo(() => {
    const map = new Map<string, number>();
    filteredTournaments.forEach((t) => {
      map.set(
        t.id,
        filteredMatches.filter((m) => m.tournamentId === t.id).length
      );
    });
    return map;
  }, [filteredTournaments, filteredMatches]);

  const openCalendarModal = () => {
    setCalendarOpen(true);
  };

  const handleSelectTournament = (tournament: Tournament) => {
    setSelected(tournament);
    setCalendarOpen(false);
  };

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

  const applyFilters = () => {
    setFilters(draftFilters);
    setPage(1);
  };

  const resetFilters = () => {
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
    setStatusFilter("todos");
    setPage(1);
  };

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
                  {activeMatchesCount}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Sedes
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">
                  {activeSedesCount}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Eventos
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-800">
                  {activeEventsCount}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Torneos en curso
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeTournaments.length === 0 ? (
                  <span className="text-xs text-slate-500">
                    No hay torneos activos.
                  </span>
                ) : (
                  activeTournaments.map((tournament) => (
                    <span
                      key={tournament.id}
                      className="rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                    >
                      {tournament.title}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Proximo partido
          </div>

          {nextActiveMatch && nextActiveTournament ? (
            <div className="mt-4 space-y-4">
              <div className="text-lg font-semibold text-slate-800">
                {nextActiveMatch.teamA.name} vs{" "}
                {nextActiveMatch.teamB.name}
              </div>
              <div className="text-xs text-slate-500">
                {nextActiveTournament.title} - {nextActiveMatch.phase}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700">
                {nextActiveMatch.date} - {nextActiveMatch.time}
              </div>
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold text-league-700"
                onClick={openCalendarModal}
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
            <div className="mt-4 space-y-3">
              <div className="text-sm text-slate-500">
                No hay partidos programados.
              </div>
              {activeTournaments.length > 0 && (
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold text-league-700"
                  onClick={openCalendarModal}
                >
                  Ver calendarios activos
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
              )}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto_auto]">
          <Select
            value={draftFilters.team}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                team: e.target.value,
              }))
            }
          >
            <option value="todos">Equipo</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </Select>

          <Select
            value={draftFilters.tournament}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                tournament: e.target.value,
              }))
            }
          >
            <option value="todos">Torneo</option>
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </Select>

          <Select
            value={draftFilters.year}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                year: e.target.value,
              }))
            }
          >
            <option value="todos">Año</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>

          <div className="flex items-center gap-3 md:contents">
            <Button variant="outline" onClick={applyFilters}>
              Buscar
            </Button>
            <ResetButton onClick={resetFilters} />
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Filtra torneos por equipo, torneo y año.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Torneos
          </h2>
          <span className="text-xs text-slate-500">
            {filteredTournaments.length}{" "}
            {statusFilter === "en-curso"
              ? "eventos activos"
              : "eventos"}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Estados
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {statusOptions.map((option) => {
                const active = statusFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setStatusFilter(option.id);
                      setPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-league-700 text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {
                        statusCounts[
                          option.id as keyof typeof statusCounts
                        ]
                      }
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {filteredTournaments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-500">
          No hay torneos con los filtros seleccionados.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pagedTournaments.map((t) => (
            <TournamentCard
              key={t.id}
              item={t}
              matchesCount={matchesCount.get(t.id) ?? 0}
              onClick={() => setSelected(t)}
            />
          ))}
        </div>
      )}

      {filteredTournaments.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando {pagedTournaments.length} de{" "}
            {filteredTournaments.length}
          </span>

          {filteredTournaments.length > pageSize && (
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filteredTournaments.length}
              onPageChange={setPage}
            />
          )}
        </div>
      )}

      <Modal
        open={calendarOpen}
        title="Calendario de torneos en curso"
        onClose={() => setCalendarOpen(false)}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            Selecciona el campeonato para ver sus proximos partidos.
          </p>

          {activeTournaments.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-500">
              No hay torneos activos en este momento.
            </div>
          ) : (
            <div className="space-y-3">
              {activeTournaments.map((tournament) => {
                const matches =
                  activeMatchesByTournament.get(tournament.id) ?? [];
                const nextMatch = matches[0];

                return (
                  <div
                    key={tournament.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {tournament.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tournament.category} · {tournament.city} ·{" "}
                          {tournament.dateRange}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() =>
                          handleSelectTournament(tournament)
                        }
                      >
                        Ver calendario
                      </Button>
                    </div>

                    {nextMatch ? (
                      <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 p-3">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Proximo partido
                        </div>
                        <div className="mt-1 text-sm text-slate-700">
                          {nextMatch.teamA.name} vs{" "}
                          {nextMatch.teamB.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {nextMatch.date} - {nextMatch.time} ·{" "}
                          {nextMatch.phase}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 text-xs text-slate-500">
                        No hay partidos programados para este torneo.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default PartidosPage;
