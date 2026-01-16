import { useState } from "react";
import Button from "../../../ui/Button";
import MatchResultCard from "../components/MatchResultCard";
import BracketMatchCard from "../components/BracketMatchCard";
import type { BracketStage, MatchResult, Tournament } from "../types";

type Props = {
  tournament: Tournament;
  results: MatchResult[];
  bracket: BracketStage[];
  onBack: () => void;
};

const PartidosDetalle = ({ results, bracket, onBack }: Props) => {
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

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
        <div className="flex gap-4 text-sm font-semibold text-slate-600">
          <button
            className={`pb-2 ${
              tab === "marcadores"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("marcadores")}
          >
            Marcadores
          </button>
          <button
            className={`pb-2 ${
              tab === "cuadro"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("cuadro")}
          >
            Cuadro de Enfrentamientos
          </button>
        </div>

        {tab === "marcadores" ? (
          results.length === 0 ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
              No hay partidos registrados.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((match) => (
                <MatchResultCard key={match.id} match={match} />
              ))}
            </div>
          )
        ) : hasBracketMatches ? (
          <div className="mt-6 space-y-10">
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
          <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
            No hay enfrentamientos registrados.
          </div>
        )}
      </div>
    </section>
  );
};

export default PartidosDetalle;
