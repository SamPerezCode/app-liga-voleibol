type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  activeItem: string;
  onSelect: (item: string) => void;
};

const navItems = [
  { label: "Inicio", icon: "/home-dashboard.svg" },
  { label: "Solicitudes", icon: "/notifications.svg" },
  { label: "Clubes", icon: "/clubs.svg" },
  { label: "Deportistas", icon: "/athlete.svg" },
  { label: "Entrenadores", icon: "/coach.svg" },
  { label: "Campeonatos", icon: "/championship.svg" },
  { label: "Partidos", icon: "/matches.svg" },
  { label: "Documentos", icon: "/documents.svg" },
  { label: "Pagos", icon: "/payments.svg" },
  { label: "Perfil", icon: "/profile.svg" },
];

const MobileSidebar = ({
  open,
  onClose,
  activeItem,
  onSelect,
}: MobileSidebarProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <aside className="absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-league-700 via-league-800 to-league-900 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">
              Liga de Voleibol
            </div>
            <div className="text-xs text-white/70">Admin Liga</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 px-3 py-1 text-sm"
          >
            ✕
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <button
                key={item.label}
                onClick={() => onSelect(item.label)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? "bg-white/20 ring-1 ring-white/30"
                    : "hover:bg-white/10"
                }`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="h-5 w-5 opacity-90"
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
