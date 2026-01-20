import { useState } from "react";
import { profile } from "../mocks";
import ProfileSummary from "../components/ProfileSummary";
import ProfileEditForm from "../components/ProfileEditForm";
import ProfilePassword from "../components/ProfilePassword";

type Tab = "resumen" | "editar" | "password";

const PerfilPage = () => {
  const [tab, setTab] = useState<Tab>("resumen");

  const navItemClass = (active: boolean) =>
    [
      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition",
      active
        ? "bg-league-700 text-white shadow-card-soft"
        : "text-slate-600 hover:bg-slate-100",
    ].join(" ");

  return (
    <section className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft lg:sticky lg:top-6">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                Navegacion
              </div>
              <div className="mt-3 grid gap-2">
                <button
                  type="button"
                  className={navItemClass(tab === "resumen")}
                  onClick={() => setTab("resumen")}
                >
                  Resumen
                </button>
                <button
                  type="button"
                  className={navItemClass(tab === "editar")}
                  onClick={() => setTab("editar")}
                >
                  Editar perfil
                </button>
                <button
                  type="button"
                  className={navItemClass(tab === "password")}
                  onClick={() => setTab("password")}
                >
                  Cambiar contrasena
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft lg:hidden">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                Navegacion
              </label>
              <select
                value={tab}
                onChange={(event) =>
                  setTab(event.target.value as Tab)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <option value="resumen">Resumen</option>
                <option value="editar">Editar perfil</option>
                <option value="password">Cambiar contrasena</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-5">
            {tab === "resumen" && (
              <ProfileSummary profile={profile} />
            )}
            {tab === "editar" && (
              <ProfileEditForm profile={profile} />
            )}
            {tab === "password" && <ProfilePassword />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilPage;
