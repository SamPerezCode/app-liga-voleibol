import type { Categoria } from "../type/types";
import Button from "../../../ui/Button";

type Props = {
  rows: Categoria[];
  onView: (row: Categoria) => void;
  onEdit: (row: Categoria) => void;
  onDelete: (row: Categoria) => void;
};

const statusStyles: Record<Categoria["status"], string> = {
  activa: "bg-emerald-100 text-emerald-700",
  inactiva: "bg-slate-100 text-slate-600",
};

const formatRangeLabel = (item: Categoria) =>
  item.edadMax >= 99
    ? `Edad ${item.edadMin}+`
    : `Edad ${item.edadMin} - ${item.edadMax}`;

const CategoriasCardsMobile = ({
  rows,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-sm text-slate-500 md:hidden">
        No hay categorias registradas
      </div>
    );
  }

  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-800">
                {row.nombre}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {formatRangeLabel(row)}
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
            >
              {row.status === "activa" ? "Activa" : "Inactiva"}
            </span>
          </div>

          <details className="mt-3 text-xs text-slate-600">
            <summary className="cursor-pointer text-league-700">
              Ver mas
            </summary>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2"></div>
              <div className="flex items-center gap-2">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => onView(row)}
                >
                  Ver
                </Button>
                <Button
                  variant="edit"
                  size="sm"
                  onClick={() => onEdit(row)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(row)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

export default CategoriasCardsMobile;
