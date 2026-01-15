import { useState } from "react";
import type { Athlete } from "../../../app/types/athletes";
import Button from "../../../ui/Button";
import StatusBadge from "../../../ui/StatusBadge";
import AthleteAvatar from "./AthleteAvatar";

type Props = {
  athlete: Athlete;
  onBack: () => void;
};

const AthleteDetail = ({ athlete, onBack }: Props) => {
  const [tab, setTab] = useState<"resumen" | "carnet">("resumen");

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Deportista N. {athlete.id.replace("ath-", "")}
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
              <AthleteAvatar
                name={athlete.fullName}
                photoUrl={athlete.photoUrl}
                size="lg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Nombre completo
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {athlete.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Fecha de nacimiento
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.birthDate}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Depto. de nacimiento
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.birthDept}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Mun. de nacimiento
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.birthCity}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Depto. de residencia
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.residenceDept}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Mun. de residencia
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.residenceCity}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Barrio
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.neighborhood}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Direccion
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.address}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Club
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.club}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Categoria
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.category}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Documento
                </p>
                <p className="text-sm text-slate-700">
                  {athlete.documentNumber}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Estado
                </p>
                <div className="mt-1 flex gap-2">
                  <StatusBadge
                    label={
                      athlete.status === "aprobado"
                        ? "Aprobado"
                        : "Pendiente"
                    }
                    tone={
                      athlete.status === "aprobado"
                        ? "approved"
                        : "pending"
                    }
                  />
                  <StatusBadge
                    label={
                      athlete.payment === "pagado"
                        ? "Pagado"
                        : "Sin pago"
                    }
                    tone={
                      athlete.payment === "pagado" ? "paid" : "unpaid"
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
                <AthleteAvatar
                  name={athlete.fullName}
                  photoUrl={athlete.photoUrl}
                  size="lg"
                />
              </div>
              <div className="px-6 pb-6 pt-4 text-center">
                <div className="text-sm font-semibold text-slate-800">
                  {athlete.fullName}
                </div>
                <div className="text-xs text-slate-500">
                  Deportista
                </div>
                <div className="mt-3 text-left text-xs text-slate-600 space-y-1">
                  <div>
                    <strong>Liga:</strong> Liga de Voleibol del Cesar
                  </div>
                  <div>
                    <strong>Club:</strong> {athlete.club}
                  </div>
                  <div>
                    <strong>Categoria:</strong> {athlete.category}
                  </div>
                  <div>
                    <strong>Fecha de nacimiento:</strong>{" "}
                    {athlete.birthDate}
                  </div>
                  <div>
                    <strong>RH:</strong> {athlete.bloodType}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-slate-100 text-[10px] text-slate-400 flex items-center justify-center">
                    QR
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-500">
                  FCV-{athlete.documentNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AthleteDetail;
