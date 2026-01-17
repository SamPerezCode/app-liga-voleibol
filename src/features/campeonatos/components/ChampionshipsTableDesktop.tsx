import type { Championship, ChampionshipStatus } from "../types";
import StatusBadge from "../../../ui/StatusBadge";

const statusLabel: Record<ChampionshipStatus, string> = {
  "en-curso": "En curso",
  programado: "Programado",
  finalizado: "Finalizado",
};

type Props = {
  rows: Championship[];
  onView?: (id: string) => void;
};

const ChampionshipsTableDesktop = ({ rows, onView }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-6 text-sm text-slate-500">
        No hay campeonatos registrados
      </div>
    );
  }

  const showActions = typeof onView === "function";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              Nombre
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Ciudad
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Inicio
            </th>
            <th className="px-4 py-3 text-left font-semibold">Fin</th>
            <th className="px-4 py-3 text-left font-semibold">
              Categoria
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Estado
            </th>
            {showActions && (
              <th className="px-4 py-3 text-left font-semibold">
                Ver
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
              <td className="px-4 py-3 text-slate-800 font-semibold">
                {row.name}
              </td>
              <td className="px-4 py-3 text-slate-600">{row.city}</td>
              <td className="px-4 py-3 text-slate-600">
                {row.startDate}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.endDate}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.category}
              </td>
              <td className="px-4 py-3">
                <StatusBadge
                  label={statusLabel[row.status]}
                  tone="info"
                />
              </td>
              {showActions && (
                <td className="px-4 py-3">
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                    onClick={() => onView?.(row.id)}
                    aria-label="Ver campeonato"
                  >
                    i
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChampionshipsTableDesktop;
