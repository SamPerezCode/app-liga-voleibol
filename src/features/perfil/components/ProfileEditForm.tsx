import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import type { Profile } from "../types";

type Props = {
  profile: Profile;
};

const ProfileEditForm = ({ profile }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-28 w-28 rounded-full border border-slate-200 object-cover bg-white"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xl font-semibold text-slate-500">
            {profile.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
        <Button className="bg-sky-600 hover:bg-sky-700">
          Cambiar foto
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700">
            Nombre *
          </label>
          <Input defaultValue={profile.name} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Departamento *
          </label>
          <Select defaultValue={profile.department}>
            <option value={profile.department}>
              {profile.department}
            </option>
          </Select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Municipio *
          </label>
          <Select defaultValue={profile.city}>
            <option value={profile.city}>{profile.city}</option>
          </Select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Barrio / Conjunto *
          </label>
          <Input defaultValue={profile.neighborhood} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Direccion *
          </label>
          <Input defaultValue={profile.address} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Telefono 1 *
          </label>
          <Input defaultValue={profile.phone1} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Telefono 2 (Opcional)
          </label>
          <Input defaultValue={profile.phone2} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Presidente *
          </label>
          <Input defaultValue={profile.president} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Vicepresidente (Opcional)
          </label>
          <Input defaultValue={profile.vicePresident} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Secretario *
          </label>
          <Input defaultValue={profile.secretary} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Tesorero (Opcional)
          </label>
          <Input defaultValue={profile.treasurer} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Vocal (Opcional)
          </label>
          <Input defaultValue={profile.vocal} />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Correo Electronico *
          </label>
          <Input defaultValue={profile.email} />
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          Guardar cambios
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
