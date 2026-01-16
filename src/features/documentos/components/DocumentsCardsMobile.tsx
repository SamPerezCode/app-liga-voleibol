import StatusBadge from "../../../ui/StatusBadge";
import type { Documento } from "../types";

type Props = {
  items: Documento[];
  onView: (doc: Documento) => void;
};

const DocumentsCardsMobile = ({ items, onView }: Props) => {
  return (
    <div className="space-y-3 lg:hidden">
      {items.map((doc) => (
        <div
          key={doc.id}
          className="rounded-xl border border-slate-200 bg-white/85 p-4 shadow-card-soft"
        >
          <div className="text-xs uppercase text-slate-400">
            Tipo de Documento
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-700">
            {doc.type}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <StatusBadge
              label={
                doc.status === "approved" ? "Aprobado" : "Pendiente"
              }
              tone={
                doc.status === "approved" ? "approved" : "pending"
              }
            />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
              onClick={() => onView(doc)}
              aria-label="Ver documento"
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
