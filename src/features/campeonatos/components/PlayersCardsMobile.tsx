import type { ChampionshipPlayer } from "../types";
import StatusBadge from "../../../ui/StatusBadge";
import PlayerAvatar from "./PlayerAvatar";

type Props = {
  rows: ChampionshipPlayer[];
  showActions: boolean;
  onAssign: (player: ChampionshipPlayer) => void;
  onView: (player: ChampionshipPlayer) => void;
};

const PlayersCardsMobile = ({
  rows,
  showActions,
  onAssign,
  onView,
}: Props) => {
  return (
    <div className="md:hidden space-y-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-3">
            <PlayerAvatar
              name={row.fullName}
              photoUrl={row.photoUrl}
            />
            <div>
              <div className="text-sm font-semibold text-slate-800">
                {row.fullName}
              </div>
              <div className="text-xs text-slate-500">
                Doc: {row.documentNumber}
              </div>
            </div>
          </div>

          <details className="mt-3 text-xs text-slate-600">
            <summary className="cursor-pointer text-league-700">
              Ver mas
            </summary>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Club</span>
                <span>{row.club}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Categoria</span>
                <span>{row.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Estado</span>
                <StatusBadge
                  label={
                    row.status === "aprobado"
                      ? "Aprobado"
                      : "Pendiente"
                  }
                  tone={
                    row.status === "aprobado" ? "approved" : "pending"
                  }
                />
              </div>
            </div>
          </details>

          {showActions && (
            <div className="mt-3 flex gap-2">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                onClick={() => onAssign(row)}
                title="Asignar numero de camiseta"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M8 3l4 3 4-3 4 3-3 5v9H7V11L4 6l4-3z" />
                </svg>
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                onClick={() => onView(row)}
                title="Ver carnet"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                  <circle cx="9" cy="12" r="2" />
                  <path d="M13 10h5M13 14h5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayersCardsMobile;
