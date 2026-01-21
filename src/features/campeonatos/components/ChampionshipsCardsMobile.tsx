import type { Championship, ChampionshipStatus } from "../types";
import StatusBadge from "../../../ui/StatusBadge";
import Button from "../../../ui/Button";

type Props = {
  rows: Championship[];
  onView?: (id: string) => void;
  onEdit?: (row: Championship) => void;
  onDelete?: (row: Championship) => void;
};

const statusLabel: Record<ChampionshipStatus, string> = {
  "en-curso": "En curso",
  programado: "Programado",
  finalizado: "Finalizado",
};

const statusTone: Record<
  ChampionshipStatus,
  "approved" | "pending" | "info"
> = {
  "en-curso": "approved",
  programado: "pending",
  finalizado: "info",
};

const ChampionshipsCardsMobile = ({
  rows,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  if (rows.length === 0) {
    return (
      <div className="md:hidden rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-500">
        No se encontraron registros
      </div>
    );
  }

  const showExtraActions = Boolean(onEdit || onDelete);

  return (
    <div className="md:hidden space-y-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
        >
          <div className="text-sm font-semibold text-slate-800">
            {row.name}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {row.city} - {row.category}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              {row.startDate} / {row.endDate}
            </span>
            <StatusBadge
              label={statusLabel[row.status]}
              tone={statusTone[row.status]}
            />
          </div>

          {showExtraActions ? (
            <details className="mt-3 text-xs text-slate-600">
              <summary className="cursor-pointer text-league-700">
                Ver mas
              </summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {onView && (
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => onView(row.id)}
                  >
                    Ver inscripciones
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="edit"
                    size="sm"
                    onClick={() => onEdit(row)}
                  >
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(row)}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            </details>
          ) : (
            onView && (
              <div className="mt-3">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onView(row.id)}
                >
                  Ver inscripciones
                </Button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ChampionshipsCardsMobile;
