type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

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

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute left-0 top-0 h-full w-72 bg-slate-950 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-lg font-semibold text-slate-100">
            Liga Voleibol
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-sm text-slate-200"
          >
            Cerrar
          </button>
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
    </div>
  );
};

export default MobileSidebar;
