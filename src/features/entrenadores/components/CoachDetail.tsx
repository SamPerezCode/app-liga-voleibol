import { useState } from "react";
import type { Coach } from "../../../app/types/coaches";
import Button from "../../../ui/Button";
import StatusBadge from "../../../ui/StatusBadge";
import CoachAvatar from "./CoachAvatar";

type Props = {
  coach: Coach;
  onBack: () => void;
};

const CoachDetail = ({ coach, onBack }: Props) => {
  const [tab, setTab] = useState<"resumen" | "carnet">("resumen");

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Entrenador N. {coach.id.replace("coach-", "")}
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Sub-nav */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Navegacion
                </div>

                <div className="mt-3 lg:hidden">
                  <select
                    value={tab}
                    onChange={(e) =>
                      setTab(e.target.value as "resumen" | "carnet")
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  >
                    <option value="resumen">Resumen</option>
                    <option value="carnet">Carnet</option>
                  </select>
                </div>

                <div className="mt-3 hidden lg:flex lg:flex-col gap-2">
                  {[
                    { id: "resumen", label: "Resumen" },
                    { id: "carnet", label: "Carnet" },
                  ].map((item) => {
                    const active = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setTab(item.id as "resumen" | "carnet")
                        }
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                          active
                            ? "bg-league-700 text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 space-y-4">
              {tab === "resumen" ? (
                <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-6">
                      <CoachAvatar
                        name={coach.fullName}
                        photoUrl={coach.photoUrl}
                        size="lg"
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        Identificacion
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">
                        {coach.fullName}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {coach.documentType}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">
                        {coach.documentNumber}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                        Contacto
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">
                        {coach.phone}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {coach.email}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <StatusBadge
                        label={
                          coach.status === "aprobado"
                            ? "Aprobado"
                            : "Pendiente"
                        }
                        tone={
                          coach.status === "aprobado"
                            ? "approved"
                            : "pending"
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Ubicacion
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {coach.city}
                        </div>
                        <div className="text-xs text-slate-500">
                          {coach.department}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Direccion
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {coach.address}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Club
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {coach.club}
                        </div>
                        <div className="text-xs text-slate-500">
                          {coach.league}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Categoria
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {coach.category}
                        </div>
                        <div className="text-xs text-slate-500">
                          Resolucion: {coach.resolutionNumber}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:col-span-2">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          Registro
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {coach.registeredAt}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white shadow-card-soft">
                    <div className="h-16 rounded-t-2xl bg-league-sweep" />
                    <div className="-mt-10 flex justify-center">
                      <CoachAvatar
                        name={coach.fullName}
                        photoUrl={coach.photoUrl}
                        size="lg"
                      />
                    </div>
                    <div className="px-6 pb-6 pt-4 text-center">
                      <div className="text-sm font-semibold text-slate-800">
                        {coach.fullName}
                      </div>
                      <div className="text-xs text-slate-500">
                        Entrenador
                      </div>
                      <div className="mt-3 text-left text-xs text-slate-600 space-y-1">
                        <div>
                          <strong>Liga:</strong> {coach.league}
                        </div>
                        <div>
                          <strong>Club:</strong> {coach.club}
                        </div>
                        <div>
                          <strong>Categoria:</strong> {coach.category}
                        </div>
                        <div>
                          <strong>Resolucion:</strong>{" "}
                          {coach.resolutionNumber}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <div className="h-20 w-20 rounded-lg bg-slate-100 text-[10px] text-slate-400 flex items-center justify-center">
                          QR
                        </div>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-500">
                        FCV-{coach.documentNumber}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachDetail;
