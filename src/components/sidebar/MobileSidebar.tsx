import type { AppSection } from "../../app/types/layout";
import { navItems } from "../../app/mocks/navigation";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  activeItem: AppSection;
  onSelect: (item: AppSection) => void;
};

const MobileSidebar = ({
  open,
  onClose,
  activeItem,
  onSelect,
}: MobileSidebarProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-[linear-gradient(180deg,#1C6F3C_0%,#145C32_35%,#0F4C2A_70%,#0B331F_100%)] p-6 text-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 p-1">
              <img
                src="/logo-liga-cesar.png"
                alt="Liga de Voleibol del Cesar"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-semibold">
                Liga de Voleibol
              </div>
              <div className="text-xs text-white/70">Admin Liga</div>
            </div>
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
