import type { Coach } from "../../../app/types/coaches";
import StatusBadge from "../../../ui/StatusBadge";
import Button from "../../../ui/Button";
import CoachAvatar from "./CoachAvatar";

type Props = {
  rows: Coach[];
  onView: (id: string) => void;
};

const CoachesCardsMobile = ({ rows, onView }: Props) => {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-3">
            <CoachAvatar
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
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Club</span>
                <span>{row.club}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Categoria</span>
                <span>{row.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Fecha</span>
                <span>{row.registeredAt}</span>
              </div>
            </div>
          </details>

          <div className="mt-3">
            <Button
              variant="info"
              size="sm"
              onClick={() => onView(row.id)}
            >
              Ver detalle
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoachesCardsMobile;
