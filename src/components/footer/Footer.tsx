const Footer = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-center text-xs text-slate-500 shadow-card-soft">
      © {new Date().getFullYear()} Liga de Voleibol del Cesar. Todos
      los derechos reservados.
    </div>
  );
};

export default Footer;
