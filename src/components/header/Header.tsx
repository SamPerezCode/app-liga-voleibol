type HeaderProps = {
  onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:pl-72 lg:pr-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-league-sweep" />

        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700"
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <div className="hidden text-sm font-medium text-slate-400 lg:block">
            Liga de Voleibol del Cesar
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700">
            Admin Liga
          </div>
          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700">
            <span className="h-7 w-7 rounded-full bg-emerald-500/30" />
            Perfil
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
