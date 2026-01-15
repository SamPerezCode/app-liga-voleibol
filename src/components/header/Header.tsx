import { useEffect, useRef, useState } from "react";
import type { User } from "../../app/types/users";

type HeaderProps = {
  onMenuClick: () => void;
  user: User;
  sectionTitle: string;
};
const roleLabels: Record<User["role"], string> = {
  admin: "Admin",
  liga: "Liga",
  club: "Club",
  deportista: "Deportista",
  entrenador: "Entrenador",
  arbitro: "Arbitro",
};

const Header = ({ onMenuClick, user, sectionTitle }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = user.nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const roleLabel = roleLabels[user.role];

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-card-soft bg-league-sweep bg-[length:100%_4px] bg-top bg-no-repeat bg-clip-padding">
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white lg:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-800">
              {sectionTitle}
            </span>
            <span className="text-xs text-slate-500">
              Liga de Voleibol del Cesar
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-league-700 text-sm font-semibold text-white">
              {initials}
            </span>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-semibold text-slate-700">
                {user.nombre}
              </span>
              <span className="text-xs text-slate-500">
                {roleLabel}
              </span>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg z-50 p-1">
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-slate-800">
                  {user.nombre}
                </div>
                <div className="text-xs text-slate-500">
                  {roleLabel}
                </div>
              </div>
              <div className="border-t border-slate-100 my-1" />{" "}
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20a8 8 0 0 1 16 0" />
                </svg>
                Mi perfil
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
