import type { Championship } from "../types";
import StatusBadge from "../../../ui/StatusBadge";
import Button from "../../../ui/Button";

type Props = {
  rows: Championship[];
  onView: (id: string) => void;
};

const ChampionshipsCardsMobile = ({ rows, onView }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="md:hidden rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-500">
        No se encontraron registros
      </div>
    );
  }

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
            <StatusBadge label={row.status} tone="info" />
          </div>
          <div className="mt-3">
            <Button
              variant="info"
              size="sm"
              onClick={() => onView(row.id)}
              title="Ver detalle"
            >
              Ver detalle
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChampionshipsCardsMobile;
