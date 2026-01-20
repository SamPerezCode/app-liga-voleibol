import type { AppSection } from "../app/types/layout";

type HomeProps = {
  onNavigate: (section: AppSection) => void;
};
const stats = [
  {
    label: "Clubes",
    value: 8,
    note: "Activos",
    icon: "/clubs.svg",
    section: "Clubes",
    accent: "from-amber-400 via-orange-500 to-amber-600",
    glow: "bg-amber-500/15",
    chip: "bg-amber-100/80 text-amber-800",
  },
  {
    label: "Deportistas",
    value: 38,
    note: "Inscritos",
    icon: "/athlete.svg",
    section: "Deportistas",
    accent: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "bg-sky-500/15",
    chip: "bg-sky-100/80 text-sky-800",
  },
  {
    label: "Torneos",
    value: 3,
    note: "En curso",
    icon: "/championship.svg",
    section: "Torneos",
    accent: "from-emerald-400 via-green-500 to-emerald-600",
    glow: "bg-emerald-500/15",
    chip: "bg-emerald-100/80 text-emerald-800",
  },
  {
    label: "Partidos",
    value: 12,
    note: "Esta semana",
    icon: "/matches.svg",
    section: "Partidos",
    accent: "from-violet-400 via-purple-500 to-fuchsia-600",
    glow: "bg-violet-500/15",
    chip: "bg-violet-100/80 text-violet-800",
  },
] as const;

const Home = ({ onNavigate }: HomeProps) => {
  const today = new Date().toLocaleDateString("es-CO");
  const maxValue = Math.max(...stats.map((stat) => stat.value));

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-league-400/15 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-600">
              LIGA DEL CESAR
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
              Gestion deportiva
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Consulta el torneo actual, proximos partidos y el estado
              de la temporada en tiempo real.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Campeonato actual",
                "Proximos partidos",
                "Resultados",
                "Tabla",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Torneo activo
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  Liga Departamental
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  En curso • categoria abierta
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Proximos partidos
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  6 encuentros
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Esta semana en Valledupar
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Resumen
              </div>
              <h2 className="mt-2 text-lg font-semibold text-slate-800">
                Indicadores clave
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Hoy • {today}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {stats.map((stat) => {
              const width = Math.round((stat.value / maxValue) * 100);

              return (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => onNavigate(stat.section)}
                  className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-4 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-league-400"
                  aria-label={`Ir a ${stat.label}`}
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full ${stat.glow} blur-2xl`}
                  />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.chip} ring-1 ring-white/60`}
                      >
                        <img
                          src={stat.icon}
                          className="h-5 w-5 opacity-80 filter brightness-75 contrast-125"
                        />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {stat.label}
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-2xl font-semibold text-slate-900">
                            {stat.value}
                          </span>
                          <span className="text-xs text-slate-400">
                            {stat.note}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {today}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${stat.accent}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate("Solicitudes")}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 p-5 text-left shadow-card-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-league-400"
      >
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Solicitudes
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800">
          Inscripciones y aprobaciones
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Gestion, validacion y aprobacion por parte de la liga.
        </p>
      </button>

      <button
        type="button"
        onClick={() => onNavigate("Pagos")}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 p-5 text-left shadow-card-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-league-400"
      >
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Pagos
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800">
          Recaudos en linea
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Realiza el pago de tu inscripcion en linea.
        </p>
      </button>

      <button
        type="button"
        onClick={() => onNavigate("Clubes")}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 p-5 text-left shadow-card-soft transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-league-400"
      >
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Gestion de clubes
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-800">
          Estado y documentos
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Seguimiento, gestion y validacion de la informacion
          relacionada.
        </p>
      </button>
    </section>
  );
};

export default Home;
