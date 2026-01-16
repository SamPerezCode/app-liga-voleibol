import type { Solicitud } from "../types/solicitudes";
import StatusBadge from "../../../ui/StatusBadge";

const statusConfig = {
  pendiente: { label: "Pendiente", tone: "pending" },
  aprobado: { label: "Aprobado", tone: "approved" },
  rechazado: { label: "Rechazado", tone: "unpaid" },
} as const;

type Props = {
  rows: Solicitud[];
  onView: (row: Solicitud) => void;
};

const SolicitudesCardsMobile = ({ rows, onView }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm text-blue-700 md:hidden">
        No hay solicitudes pendientes
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => {
        const status = statusConfig[row.estado];
        return (
          <div
            key={row.id}
            className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                {row.tipo}
              </div>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>

            <div className="mt-2 text-sm font-semibold text-slate-800">
              {row.nombre}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {row.rol}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{row.fecha}</span>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                aria-label="Ver solicitud"
                onClick={() => onView(row)}
              >
                i
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SolicitudesCardsMobile;
