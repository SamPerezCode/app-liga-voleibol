const Login = () => {
  return (
    <div className="relative min-h-screen bg-league-soft text-slate-900">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-card-soft">
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-league-sweep" />
          <div className="mb-8 text-center">
            <img
              src="/logo-liga-cesar.png"
              alt="Liga de Voleibol del Cesar"
              className="mx-auto mb-4 h-16"
            />
            <div className="text-2xl font-semibold text-ink-900">
              Ingresar a la plataforma
            </div>
            <p className="text-sm text-slate-500">
              Escriba su usuario y contraseña
            </p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="text-sm text-slate-600">
                Usuario
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M20 21a8 8 0 1 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 bg-white/70 py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-slate-400 focus:border-league-400 focus:outline-none"
                  placeholder="usuario"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Contrasena
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <input
                  type="password"
                  className="w-full rounded-xl border border-slate-200 bg-white/70 py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-slate-400 focus:border-league-400 focus:outline-none"
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-league-500 via-league-400 to-league-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-league-500/20 transition hover:from-league-600 hover:to-league-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
                Ingresar
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-league-600 bg-white/70 px-4 py-3 text-sm font-semibold text-league-700 backdrop-blur hover:bg-league-50">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Registrarse
              </button>
            </div>
            <div className="pt-2">
              <button
                type="button"
                className="mx-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-500 backdrop-blur transition hover:border-league-300 hover:text-league-700"
              >
                ¿Olvido su contrasena?
              </button>
            </div>
          </form>{" "}
        </div>

        <div className="rounded-2xl bg-league-sweep p-10 text-white shadow-card-soft">
          <h2 className="text-3xl font-semibold">Bienvenido</h2>
          <p className="mt-3 text-sm text-white/85">
            Ingresa a la plataforma oficial de la Liga de Voleibol del
            Cesar para acceder a información de clubes, partidos,
            campeonatos, pagos e inscripciones.
          </p>
          <div className="mt-6 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm">
            Gestión centralizada para ligas, clubes, deportistas y
            entrenadores.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
