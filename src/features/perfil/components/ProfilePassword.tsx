import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";

const ProfilePassword = () => {
  const [show, setShow] = useState(false);
  const type = show ? "text" : "password";

  return (
    <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Seguridad
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Recomendaciones
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Usa minimo 8 caracteres.</li>
          <li>Combina letras y numeros.</li>
          <li>No repitas contrasenas anteriores.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Actualizar acceso
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Cambiar contrasena
            </p>
          </div>
          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={show}
              onChange={() => setShow((v) => !v)}
            />
            Mostrar
          </label>
        </div>

        <div className="mt-4 grid gap-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Contrasena actual
            </label>
            <Input type={type} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Nueva contrasena
            </label>
            <Input type={type} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Confirmar nueva contrasena
            </label>
            <Input type={type} />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button className="bg-slate-800 hover:bg-slate-900">
            Cambiar contrasena
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePassword;
