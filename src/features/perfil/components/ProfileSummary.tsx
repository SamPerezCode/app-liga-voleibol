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

  const safe = (value?: string) => value || "-";

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
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
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-500">
                {initials}
              </div>
            )}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Organizacion
              </p>
              <p className="text-base font-semibold text-slate-800">
                {profile.name}
              </p>
              <p className="text-xs text-slate-500">
                Perfil institucional de la liga
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Municipio: {profile.city}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Departamento: {profile.department}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Email: {profile.email}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Contacto y ubicacion
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Direccion
              </p>
              {safe(profile.address)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Barrio / Conjunto
              </p>
              {safe(profile.neighborhood)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Telefono 1
              </p>
              {safe(profile.phone1)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Telefono 2
              </p>
              {safe(profile.phone2)}
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Correo Electronico
              </p>
              {safe(profile.email)}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Directivos
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-slate-700">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Presidente
              </p>
              {safe(profile.president)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Vicepresidente
              </p>
              {safe(profile.vicePresident)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Secretario
              </p>
              {safe(profile.secretary)}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Tesorero
              </p>
              {safe(profile.treasurer)}
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                Vocal
              </p>
              {safe(profile.vocal)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
