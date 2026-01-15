import type { Club } from "../types";
import StatusBadge from "../../../ui/StatusBadge";

type Props = {
  club: Club;
  onClick: () => void;
};

const ClubCard = ({ club, onClick }: Props) => {
  const initials = club.nombre
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 text-left shadow-card-soft transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
    >
      <div className="flex h-40 items-center justify-center bg-slate-50">
        {club.logoUrl ? (
          <img
            src={club.logoUrl}
            alt={club.nombre}
            className="h-24 w-24 object-contain"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-xl font-semibold text-slate-500 shadow-sm">
            {initials}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        <div className="text-sm font-semibold text-slate-800">
          {club.nombre}
        </div>
        <div className="text-xs text-slate-500">
          {club.departamento}
        </div>
        <div className="text-xs text-slate-500">
          Liga: {club.liga}
        </div>
        <div className="text-xs text-slate-500">
          Presidente: {club.presidente}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge
            label={
              club.estado === "aprobado" ? "Aprobado" : "Pendiente"
            }
            tone={club.estado === "aprobado" ? "approved" : "pending"}
          />
          <StatusBadge
            label={club.pago === "pagado" ? "Pagado" : "Sin pago"}
            tone={club.pago === "pagado" ? "paid" : "unpaid"}
          />
        </div>
      </div>
    </button>
  );
};

export default ClubCard;
