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
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 flex-col bg-gradient-to-b from-league-700 via-league-800 to-league-900 px-6 py-6 text-white lg:flex">
      <div className="mb-8">
        <div className="text-lg font-semibold text-white">
          Liga Voleibol
        </div>
        <div className="text-sm text-white/70">
          Panel administrativo
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item}
            className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-left text-sm text-slate-200 transition hover:border-slate-800 hover:bg-slate-900"
          >
            <span className="h-2 w-2 rounded-full bg-league-300 shadow-[0_0_8px_rgba(74,207,108,0.6)]" />
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
