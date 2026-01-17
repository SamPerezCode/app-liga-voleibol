import type { Tournament, TournamentStatus } from "../types";

const statusLabel: Record<TournamentStatus, string> = {
  "en-curso": "En curso",
  programado: "Programado",
  finalizado: "Finalizado",
};

const statusStyle: Record<TournamentStatus, string> = {
  "en-curso":
    "bg-emerald-500/15 text-emerald-700 ring-emerald-300/40",
  programado: "bg-sky-500/15 text-sky-700 ring-sky-300/40",
  finalizado: "bg-slate-500/10 text-slate-600 ring-slate-200/50",
};

const accent: Record<TournamentStatus, string> = {
  "en-curso": "from-emerald-400 via-green-500 to-emerald-600",
  programado: "from-sky-400 via-blue-500 to-indigo-600",
  finalizado: "from-slate-300 via-slate-400 to-slate-500",
};

type Props = {
  item: Tournament;
  matchesCount: number;
  onClick: () => void;
};

const TournamentCard = ({ item, matchesCount, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 text-left shadow-card-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          accent[item.status]
        }`}
      />

      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
          {item.year}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${
            statusStyle[item.status]
          }`}
        >
          {statusLabel[item.status]}
        </span>
      </div>

      <div className="mt-3 text-lg font-semibold text-slate-900">
        {item.title}
      </div>
      <div className="mt-1 text-xs text-slate-500">
        {item.category}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Sede
          </div>
          <div className="mt-1 font-semibold text-slate-700">
            {item.city}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Fechas
          </div>
          <div className="mt-1 font-semibold text-slate-700">
            {item.dateRange}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{matchesCount} partidos</span>
        <span className="inline-flex items-center gap-1 text-league-700">
          Ver calendario
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </button>
  );
};

export default TournamentCard;
