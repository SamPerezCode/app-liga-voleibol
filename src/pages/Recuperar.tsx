import { Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Recuperar = () => {
  return (
    <div className="min-h-screen bg-league-soft text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-10">
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-card-soft">
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-league-sweep" />
          <div className="text-center">
            <img
              src="/logo-liga-cesar.png"
              alt="Liga de Voleibol del Cesar"
              className="mx-auto mb-4 h-16"
            />
            <h1 className="text-lg font-semibold text-slate-800">
              Recuperar cuenta
            </h1>
            <p className="text-xs text-slate-500">
              Escribe tu usuario o correo para enviar el acceso.
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-slate-500">
                Usuario o correo
              </label>
              <Input placeholder="usuario@correo.com" />
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>

          <div className="mt-4 text-right">
            <Link
              to="/login"
              className="text-xs text-league-700 hover:underline"
            >
              Ingresar a la plataforma
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
