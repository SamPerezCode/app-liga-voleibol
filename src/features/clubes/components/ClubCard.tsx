import type { Club } from "../types";

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

  const statusClass =
    club.estado === "aprobado"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";
  const paymentClass =
    club.pago === "pagado"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-rose-100 text-rose-700";

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
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${statusClass}`}
          >
            {club.estado === "aprobado" ? "Aprobado" : "Pendiente"}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${paymentClass}`}
          >
            {club.pago === "pagado" ? "Pagado" : "Sin pago"}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ClubCard;
