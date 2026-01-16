import { useState } from "react";
import { profile } from "../mocks";
import ProfileSummary from "../components/ProfileSummary";
import ProfileEditForm from "../components/ProfileEditForm";
import ProfilePassword from "../components/ProfilePassword";

type Tab = "resumen" | "editar" | "password";

const PerfilPage = () => {
  const [tab, setTab] = useState<Tab>("resumen");

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <div className="flex gap-6 border-b border-slate-200 text-sm font-semibold text-slate-600">
          <button
            className={`pb-3 ${
              tab === "resumen"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("resumen")}
          >
            Resumen
          </button>
          <button
            className={`pb-3 ${
              tab === "editar"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("editar")}
          >
            Editar perfil
          </button>
          <button
            className={`pb-3 ${
              tab === "password"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("password")}
          >
            Cambiar contrasena
          </button>
        </div>

        <div className="pt-6">
          {tab === "resumen" && <ProfileSummary profile={profile} />}
          {tab === "editar" && <ProfileEditForm profile={profile} />}
          {tab === "password" && <ProfilePassword />}
        </div>
      </div>
    </section>
  );
};

export default PerfilPage;
