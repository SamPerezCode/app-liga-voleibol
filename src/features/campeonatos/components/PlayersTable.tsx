import StatusBadge from "../../../ui/StatusBadge";
import PlayerAvatar from "./PlayerAvatar";
import PlayersCardsMobile from "./PlayersCardsMobile";
import type { ChampionshipPlayer } from "../types";

type PlayersTableProps = {
  rows: ChampionshipPlayer[];
  showActions: boolean;
  onAssign: (player: ChampionshipPlayer) => void;
  onView: (player: ChampionshipPlayer) => void;
};

const PlayersTable = ({
  rows,
  showActions,
  onAssign,
  onView,
}: PlayersTableProps) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-6 text-sm text-slate-500">
        No hay deportistas registrados
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/80">
          <table className="min-w-[720px] text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  Deportista
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Documento
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Nacimiento
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Club
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Categoria
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Estado
                </th>
                {showActions && (
                  <th className="px-4 py-3 text-left font-semibold">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <PlayerAvatar
                        name={row.fullName}
                        photoUrl={row.photoUrl}
                      />
                      <span className="text-slate-800 font-semibold">
                        {row.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.documentNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.birthDate}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.club}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.category}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={
                        row.status === "aprobado"
                          ? "Aprobado"
                          : "Pendiente"
                      }
                      tone={
                        row.status === "aprobado"
                          ? "approved"
                          : "pending"
                      }
                    />
                  </td>
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                          onClick={() => onAssign(row)}
                          title="Asignar numero de camiseta"
                          aria-label="Asignar numero de camiseta"
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
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                          onClick={() => onView(row)}
                          title="Ver carnet"
                          aria-label="Ver carnet"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          >
                            <rect
                              x="4"
                              y="6"
                              width="16"
                              height="12"
                              rx="2"
                            />
                            <circle cx="9" cy="12" r="2" />
                            <path d="M13 10h5M13 14h5" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PlayersCardsMobile
        rows={rows}
        showActions={showActions}
        onAssign={onAssign}
        onView={onView}
      />
    </div>
  );
};

export default PlayersTable;
