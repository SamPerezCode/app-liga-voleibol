const navItems = [
  "Inicio",
  "Solicitudes",
  "Clubes",
  "Deportistas",
  "Entrenadores",
  "Campeonatos",
  "Partidos",
  "Documentos",
  "Pagos",
  "Perfil",
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/95 px-6 py-6 lg:flex">
      <div className="mb-8">
        <div className="text-lg font-semibold tracking-tight text-slate-100">
          Liga Voleibol
        </div>
        <div className="text-sm text-slate-400">
          Panel administrativo
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item}
            className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-left text-sm text-slate-200 transition hover:border-slate-800 hover:bg-slate-900"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
