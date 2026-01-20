import type { AppSection } from "../../app/types/layout";
import { navItems } from "../../app/mocks/navigation";

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  activeItem: AppSection;
  onSelect: (item: AppSection) => void;
};

const Sidebar = ({
  open,
  onToggle,
  activeItem,
  onSelect,
}: SidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen ${
        open ? "w-72" : "w-16"
      } flex-col bg-[linear-gradient(180deg,#1C6F3C_0%,#145C32_35%,#0F4C2A_70%,#0B331F_100%)] text-white transition-[width] duration-300 ease-out lg:flex`}
    >
      <div className="relative min-h-16 px-3 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {open && (
              <div className="h-10 w-10 rounded-xl bg-white/10 p-1">
                <img
                  src="/logo-liga-cesar.png"
                  alt="Liga de Voleibol del Cesar"
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <div
              className={`overflow-hidden ${
                open
                  ? "transition-[max-width,opacity,transform] duration-200 ease-out delay-50 max-w-[180px] opacity-100 translate-x-0"
                  : "transition-none max-w-0 opacity-0 -translate-x-2"
              }`}
            >
              <div className="flex flex-col gap-0.5 leading-tight">
                <span className="text-sm font-semibold">
                  Liga de Voleibol
                </span>
                <span className="text-xs text-white/70">
                  Admin Liga
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
            aria-label={open ? "Cerrar sidebar" : "Abrir sidebar"}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <nav
        className={`flex flex-1 flex-col justify-center gap-1 px-2 ${
          open ? "items-stretch" : "items-center"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              tabIndex={0}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                open
                  ? "w-full justify-start"
                  : "h-10 w-10 justify-center"
              } ${
                isActive
                  ? "bg-white/20 ring-1 ring-white/30"
                  : "hover:bg-white/10"
              }`}
            >
              <img
                src={item.icon}
                alt=""
                className="h-5 w-5 opacity-90"
                aria-hidden="true"
              />
              {open && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
