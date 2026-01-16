import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClubForm from "../components/ClubForm";
import DeportistaForm from "../components/DeportistaForm";
import EntrenadorForm from "../components/EntrenadorForm";
import ArbitroForm from "../components/ArbitroForm";
import Button from "../../../ui/Button";

type RegistroRole = "club" | "deportista" | "entrenador" | "arbitro";

const roleOptions: { id: RegistroRole; label: string }[] = [
  { id: "club", label: "Club" },
  { id: "deportista", label: "Deportista" },
  { id: "entrenador", label: "Entrenador" },
  { id: "arbitro", label: "Arbitro" },
];

const RegistroPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<RegistroRole>("club");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClear = () => {
    formRef.current?.reset();
  };

  return (
    <section className="relative">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-league-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-league-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_-40px_rgba(15,76,42,0.45)]">
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-league-sweep" />

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Registro - Liga de Voleibol del Cesar
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
              >
                Regresar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                Limpiar formulario
              </Button>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Selecciona el tipo de usuario y completa el formulario.
          </p>

          <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-2">
            <div className="sm:hidden">
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as RegistroRole)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {roleOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
              {roleOptions.map((option) => {
                const active = option.id === role;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setRole(option.id)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-league-700 text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {option.label[0]}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-inner">
            {role === "club" && <ClubForm formRef={formRef} />}
            {role === "deportista" && (
              <DeportistaForm formRef={formRef} />
            )}
            {role === "entrenador" && (
              <EntrenadorForm formRef={formRef} />
            )}
            {role === "arbitro" && <ArbitroForm formRef={formRef} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistroPage;
