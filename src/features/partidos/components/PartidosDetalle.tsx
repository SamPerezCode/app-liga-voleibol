import { useState } from "react";
import Button from "../../../ui/Button";
import MatchResultCard from "./MatchResultCard";
import BracketMatchCard from "./BracketMatchCard";
import type { BracketStage, MatchResult, Tournament } from "../types";

type Props = {
  tournament: Tournament;
  results: MatchResult[];
  bracket: BracketStage[];
  onBack: () => void;
};

const statusLabel = {
  "en-curso": "En curso",
  programado: "Programado",
  finalizado: "Finalizado",
} as const;

const statusStyle = {
  "en-curso":
    "bg-emerald-500/15 text-emerald-700 ring-emerald-300/40",
  programado: "bg-sky-500/15 text-sky-700 ring-sky-300/40",
  finalizado: "bg-slate-500/10 text-slate-600 ring-slate-200/50",
} as const;

const PartidosDetalle = ({
  tournament,
  results,
  bracket,
  onBack,
}: Props) => {
  const [tab, setTab] = useState<"marcadores" | "cuadro">(
    "marcadores"
  );

  const orderedBracket = [...bracket].sort(
    (a, b) => a.order - b.order
  );

  const hasBracketMatches = orderedBracket.some(
    (stage) => stage.matches.length > 0
  );

  const stageColumns = (count: number) => {
    if (count <= 1) return "grid-cols-1";
    if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  };

  const stageMaxWidth = (count: number) => {
    if (count <= 1) return "max-w-md";
    if (count <= 2) return "max-w-2xl";
    return "max-w-6xl";
  };

  const resultsCount = results.length;
  const bracketCount = orderedBracket.reduce(
    (sum, stage) => sum + stage.matches.length,
    0
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Resultados de Partidos
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Torneo
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {tournament.title}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {tournament.category} · {tournament.city}
            </div>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${
              statusStyle[tournament.status]
            }`}
          >
            {statusLabel[tournament.status]}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Fechas
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {tournament.dateRange}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Partidos
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {resultsCount}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Llaves
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {bracketCount}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sub-nav */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Navegacion
              </div>

              {/* Desktop nav */}
              <div className="mt-3 flex flex-col gap-2">
                {[
                  {
                    id: "marcadores",
                    label: "Marcadores",
                    count: resultsCount,
                  },
                  {
                    id: "cuadro",
                    label: "Cuadro de Enfrentamientos",
                    count: bracketCount,
                  },
                ].map((item) => {
                  const active = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setTab(item.id as "marcadores" | "cuadro")
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                        active
                          ? "bg-league-700 text-white shadow-md"
                          : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            {tab === "marcadores" ? (
              results.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
                  No hay partidos registrados.
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {results.map((match) => (
                    <MatchResultCard key={match.id} match={match} />
                  ))}
                </div>
              )
            ) : hasBracketMatches ? (
              <div className="space-y-10">
                {orderedBracket.map((stage) => (
                  <section key={stage.stage} className="space-y-3">
                    <div className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {stage.title}
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`grid w-full gap-6 justify-items-center ${stageColumns(
                          stage.matches.length
                        )} ${stageMaxWidth(stage.matches.length)}`}
                      >
                        {stage.matches.map((m) => (
                          <BracketMatchCard key={m.id} match={m} />
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
                No hay enfrentamientos registrados.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartidosDetalle;
