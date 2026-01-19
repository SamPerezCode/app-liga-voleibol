import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import type { Profile } from "../types";

type Props = {
  profile: Profile;
};

const ProfileEditForm = ({ profile }: Props) => {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
        <div className="absolute inset-x-0 top-0 h-1 bg-league-sweep" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-20 w-20 rounded-2xl border border-slate-200 object-cover bg-white"
              />
            ) : (
              <div
                translate="no"
                className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-500"
              >
                {initials}
              </div>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Perfil
              </p>
              <p className="text-base font-semibold text-slate-800">
                {profile.name}
              </p>
              <p className="text-xs text-slate-500">
                Actualiza los datos institucionales
              </p>
            </div>
          </div>
          <Button className="bg-league-600 hover:bg-league-700">
            Cambiar foto
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Datos generales
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Identidad y ubicacion
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Nombre
            </label>
            <Input defaultValue={profile.name} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Departamento
            </label>
            <Select defaultValue={profile.department}>
              <option value={profile.department}>
                {profile.department}
              </option>
            </Select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Municipio
            </label>
            <Select defaultValue={profile.city}>
              <option value={profile.city}>{profile.city}</option>
            </Select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Barrio / Conjunto
            </label>
            <Input defaultValue={profile.neighborhood} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Direccion
            </label>
            <Input defaultValue={profile.address} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Contacto
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Lineas y correo oficial
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Telefono 1
            </label>
            <Input defaultValue={profile.phone1} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Telefono 2 (Opcional)
            </label>
            <Input defaultValue={profile.phone2} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Correo Electronico
            </label>
            <Input defaultValue={profile.email} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
          Directivos
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Representantes y responsables
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Presidente
            </label>
            <Input defaultValue={profile.president} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Vicepresidente (Opcional)
            </label>
            <Input defaultValue={profile.vicePresident} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Secretario
            </label>
            <Input defaultValue={profile.secretary} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Tesorero (Opcional)
            </label>
            <Input defaultValue={profile.treasurer} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Vocal (Opcional)
            </label>
            <Input defaultValue={profile.vocal} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
