import type { Coach } from "../../../app/types/coaches";
import StatusBadge from "../../../ui/StatusBadge";
import CoachAvatar from "./CoachAvatar";

type Props = {
  rows: Coach[];
  onView: (id: string) => void;
};

const CoachesTableDesktop = ({ rows, onView }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-6 text-sm text-slate-500">
        No hay entrenadores registrados
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              Entrenador
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Documento
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Club / Categoria
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Estado
            </th>
            <th className="px-4 py-3 text-left font-semibold">
              Registro
            </th>
            <th className="px-4 py-3 text-left font-semibold">Ver</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-slate-100 transition hover:bg-slate-50"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <CoachAvatar
                    name={row.fullName}
                    photoUrl={row.photoUrl}
                    size="sm"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {row.fullName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {row.city}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-semibold text-slate-800">
                  {row.documentNumber}
                </div>
                <div className="text-xs text-slate-500">
                  {row.documentType}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-semibold text-slate-800">
                  {row.club}
                </div>
                <div className="text-xs text-slate-500">
                  {row.category}
                </div>
              </td>
              <td className="px-4 py-3">
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
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.registeredAt}
              </td>
              <td className="px-4 py-3">
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                  onClick={() => onView(row.id)}
                >
                  i
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoachesTableDesktop;
