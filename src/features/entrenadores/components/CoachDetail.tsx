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
        <div className="flex gap-4 text-sm font-semibold text-slate-600">
          <button
            className={`pb-2 ${
              tab === "resumen"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("resumen")}
          >
            Resumen
          </button>
          <button
            className={`pb-2 ${
              tab === "carnet"
                ? "border-b-2 border-league-600 text-league-700"
                : ""
            }`}
            onClick={() => setTab("carnet")}
          >
            Carnet
          </button>
        </div>

        {tab === "resumen" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[180px_1fr]">
            <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-6">
              <CoachAvatar
                name={coach.fullName}
                photoUrl={coach.photoUrl}
                size="lg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Nombre completo
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {coach.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Documento
                </p>
                <p className="text-sm text-slate-700">
                  {coach.documentNumber}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Departamento
                </p>
                <p className="text-sm text-slate-700">
                  {coach.department}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Municipio
                </p>
                <p className="text-sm text-slate-700">{coach.city}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Direccion
                </p>
                <p className="text-sm text-slate-700">
                  {coach.address}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Telefono
                </p>
                <p className="text-sm text-slate-700">
                  {coach.phone}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Correo
                </p>
                <p className="text-sm text-slate-700">
                  {coach.email}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Club
                </p>
                <p className="text-sm text-slate-700">{coach.club}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Categoria
                </p>
                <p className="text-sm text-slate-700">
                  {coach.category}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Estado
                </p>
                <div className="mt-1">
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
            </div>
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white shadow-card-soft">
              <div className="h-16 rounded-t-2xl bg-gradient-to-r from-amber-400 via-blue-500 to-red-500" />
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
    </section>
  );
};

export default CoachDetail;
