import type { ClubDocument } from "../types";
import StatusBadge from "../../../ui/StatusBadge";

type Props = {
  rows: ClubDocument[];
};

const DocumentsCardsMobile = ({ rows }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="md:hidden rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-500">
        No hay documentos registrados
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
            {row.tipo}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <StatusBadge
              label={
                row.estado === "aprobado" ? "Aprobado" : "Pendiente"
              }
              tone={
                row.estado === "aprobado" ? "approved" : "pending"
              }
            />

            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            >
              i
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsCardsMobile;
