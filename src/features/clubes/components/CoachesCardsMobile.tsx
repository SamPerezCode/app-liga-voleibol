import type { ClubCoachRow } from "../types";
import StatusBadge from "../../../ui/StatusBadge";
import PersonAvatar from "./PersonAvatar";

type Props = {
  rows: ClubCoachRow[];
};

const CoachesCardsMobile = ({ rows }: Props) => {
  return (
    <div className="space-y-3 md:hidden">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-3">
            <PersonAvatar name={row.nombre} photoUrl={row.fotoUrl} />
            <div>
              <div className="text-sm font-semibold text-slate-800">
                {row.nombre}
              </div>
              <div className="text-xs text-slate-500">
                Doc: {row.documento}
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
                    row.estado === "aprobado"
                      ? "Aprobado"
                      : "Pendiente"
                  }
                  tone={
                    row.estado === "aprobado" ? "approved" : "pending"
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Club</span>
                <span>{row.club}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-slate-400">Fecha</span>
                <span>{row.fechaRegistro}</span>
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
};

export default CoachesCardsMobile;
