import type { Profile } from "../types";

type Props = {
  profile: Profile;
};

const ProfileSummary = ({ profile }: Props) => {
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-20 w-20 rounded-full border border-slate-200 object-cover bg-white"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-500">
            {initials}
          </div>
        )}
        <div>
          <p className="text-xs uppercase text-slate-400">Nombre</p>
          <p className="text-sm font-semibold text-slate-700">
            {profile.name}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 text-sm text-slate-700">
        <div className="grid gap-3">
          <div>
            <p className="text-xs uppercase text-slate-400">
              Municipio
            </p>
            {profile.city}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Direccion
            </p>
            {profile.address}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Telefono 2
            </p>
            {profile.phone2 || "-"}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Vicepresidente
            </p>
            {profile.vicePresident || "-"}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Tesorero
            </p>
            {profile.treasurer || "-"}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Correo Electronico
            </p>
            {profile.email}
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <p className="text-xs uppercase text-slate-400">
              Departamento
            </p>
            {profile.department}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Barrio / Conjunto
            </p>
            {profile.neighborhood}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Telefono 1
            </p>
            {profile.phone1}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Presidente
            </p>
            {profile.president}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Secretario
            </p>
            {profile.secretary}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">Vocal</p>
            {profile.vocal || "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
