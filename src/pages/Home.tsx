const stats = [
  {
    label: "Clubes",
    value: 8,
    icon: "/clubs.svg",
    note: "Activos",
    accent: "from-amber-400 via-orange-500 to-amber-600",
    glow: "bg-amber-500/15",
    chip: "bg-amber-100/80 text-amber-800",
  },
  {
    label: "Deportistas",
    value: 38,
    icon: "/athlete.svg",
    note: "Inscritos",
    accent: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "bg-sky-500/15",
    chip: "bg-sky-100/80 text-sky-800",
  },
  {
    label: "Campeonatos",
    value: 3,
    icon: "/championship.svg",
    note: "En curso",
    accent: "from-emerald-400 via-green-500 to-emerald-600",
    glow: "bg-emerald-500/15",
    chip: "bg-emerald-100/80 text-emerald-800",
  },
  {
    label: "Partidos",
    value: 12,
    icon: "/matches.svg",
    note: "Esta semana",
    accent: "from-violet-400 via-purple-500 to-fuchsia-600",
    glow: "bg-violet-500/15",
    chip: "bg-violet-100/80 text-violet-800",
  },
];

const Home = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <h1 className="text-2xl font-semibold">
          ¡Bienvenido, Liga de Voleibol del Cesar!
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Panel administrativo de la Federación Colombiana de Voleibol
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-5 shadow-card-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`}
            />
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full ${stat.glow} blur-2xl`}
            />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {stat.note}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.chip} ring-1 ring-white/60`}
              >
                <img
                  src={stat.icon}
                  className="h-5 w-5 opacity-80 filter brightness-75 contrast-125"
                />
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-400">
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-CO")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
