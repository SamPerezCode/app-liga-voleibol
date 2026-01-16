import { useState } from "react";
import { tournaments, matchResults, bracketStages } from "../mocks";
import TournamentCard from "../components/TournamentCard";
import PartidosDetalle from "../components/PartidosDetalle";
import type { Tournament } from "../types";

const PartidosPage = () => {
  const [selected, setSelected] = useState<Tournament | null>(null);

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
    <section className="space-y-6">
      <h1 className="text-xl font-semibold text-league-700">
        Partidos
      </h1>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card-soft">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tournaments.map((t) => (
            <TournamentCard
              key={t.id}
              item={t}
              onClick={() => setSelected(t)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartidosPage;
