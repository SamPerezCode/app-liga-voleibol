import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import LigaForm from "../components/LigaForm";
import ClubForm from "../components/ClubForm";
import DeportistaForm from "../components/DeportistaForm";
import EntrenadorForm from "../components/EntrenadorForm";
import ArbitroForm from "../components/ArbitroForm";

type RegistroRole =
  | "liga"
  | "club"
  | "deportista"
  | "entrenador"
  | "arbitro";

const roleOptions: { id: RegistroRole; label: string }[] = [
  { id: "liga", label: "Liga" },
  { id: "club", label: "Club" },
  { id: "deportista", label: "Deportista" },
  { id: "entrenador", label: "Entrenador" },
  { id: "arbitro", label: "Arbitro" },
];

const RegistroPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<RegistroRole>("liga");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClear = () => {
    formRef.current?.reset();
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Registro - Liga de Voleibol del Cesar
            </h1>
            <p className="text-xs text-slate-500">
              Selecciona el tipo de usuario y completa el formulario.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
            >
              Regresar
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Limpiar formulario
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {roleOptions.map((option) => {
            const active = option.id === role;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setRole(option.id)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-league-700 bg-league-700 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
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

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5">
          {role === "liga" && <LigaForm formRef={formRef} />}
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
    </section>
  );
};

export default RegistroPage;
