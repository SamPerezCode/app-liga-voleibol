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

  const accent =
    club.estado === "aprobado"
      ? "from-emerald-400 via-green-500 to-emerald-600"
      : "from-amber-400 via-orange-500 to-amber-600";

  return (
    <button
      onClick={onClick}
      className="group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 text-left shadow-card-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
      />
      <div className="absolute -right-16 -top-16 h-28 w-28 rounded-full bg-league-400/10 blur-2xl" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-600 shadow-sm">
          {club.logoUrl ? (
            <img
              src={club.logoUrl}
              alt={club.nombre}
              className="h-10 w-10 object-contain"
            />
          ) : (
            initials
          )}
        </div>

        <div className="flex-1">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Club
            </div>
            <div className="mt-1 text-base font-semibold text-slate-800">
              {club.nombre}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {club.municipio} - {club.barrio}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge
                label={
                  club.estado === "aprobado"
                    ? "Aprobado"
                    : "Pendiente"
                }
                tone={
                  club.estado === "aprobado" ? "approved" : "pending"
                }
              />
              <StatusBadge
                label={club.pago === "pagado" ? "Pagado" : "Sin pago"}
                tone={club.pago === "pagado" ? "paid" : "unpaid"}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="text-xs text-slate-500">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Presidente
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-700">
                {club.presidente}
              </div>
            </div>
            <div className="text-xs text-slate-500">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Contacto
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-700">
                {club.telefono1}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-xs text-slate-400">
        <span>Ver documentos, deportistas y entrenadores</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-slate-200">
          <img
            src="/arrow-next.svg"
            alt="Ver documentos, deportistas y entrenadores"
            aria-hidden="true"
            className="h-5 w-5 opacity-90 filter brightness-75 contrast-125"
          />
        </span>
      </div>
    </button>
  );
};

export default ClubCard;
