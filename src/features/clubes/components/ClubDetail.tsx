import { useMemo, useState } from "react";
import type {
  Club,
  ClubAthleteRow,
  ClubCoachRow,
  ClubDocument,
} from "../types";
import Button from "../../../ui/Button";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import StatusBadge from "../../../ui/StatusBadge";

import AthletesTableDesktop from "./AthletesTableDesktop";
import AthletesCardsMobile from "./AthletesCardsMobile";
import CoachesTableDesktop from "./CoachesTableDesktop";
import CoachesCardsMobile from "./CoachesCardsMobile";
import DocumentsCardsMobile from "./DocumentsCardsMobile";
import PersonAvatar from "./PersonAvatar";

type Props = {
  club: Club;
  documents: ClubDocument[];
  athletes: ClubAthleteRow[];
  coaches: ClubCoachRow[];
  onBack: () => void;
};

type DetailTab = "documents" | "athletes" | "coaches";

const ClubDetail = ({
  club,
  documents,
  athletes,
  coaches,
  onBack,
}: Props) => {
  const [tab, setTab] = useState<DetailTab>("documents");
  const [athletePage, setAthletePage] = useState(1);
  const [coachPage, setCoachPage] = useState(1);
  const pageSize = 5;
  const pagedAthletes = useMemo(() => {
    const start = (athletePage - 1) * pageSize;
    return athletes.slice(start, start + pageSize);
  }, [athletes, athletePage, pageSize]);

  const pagedCoaches = useMemo(() => {
    const start = (coachPage - 1) * pageSize;
    return coaches.slice(start, start + pageSize);
  }, [coaches, coachPage, pageSize]);

  const documentColumns: TableColumn<ClubDocument>[] = [
    { key: "tipo", label: "Tipo de Documento" },
    {
      key: "estado",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={row.estado === "aprobado" ? "Aprobado" : "Pendiente"}
          tone={row.estado === "aprobado" ? "approved" : "pending"}
        />
      ),
    },
    {
      key: "id",
      label: "Ver",
      render: () => (
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          i
        </div>
      ),
    },
  ];

  const athleteColumns: TableColumn<ClubAthleteRow>[] = [
    {
      key: "fotoUrl",
      label: "Foto",
      render: (row) => (
        <PersonAvatar
          name={row.nombre}
          photoUrl={row.fotoUrl}
          size="sm"
        />
      ),
    },
    { key: "nombre", label: "Nombre" },
    { key: "documento", label: "Numero de Documento" },
    { key: "categoria", label: "Categoria" },
    {
      key: "estado",
      label: "Estado",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <StatusBadge
            label={
              row.estado === "aprobado" ? "Aprobado" : "Pendiente"
            }
            tone={row.estado === "aprobado" ? "approved" : "pending"}
          />
          <StatusBadge
            label={row.pago === "pagado" ? "Pagado" : "Sin pago"}
            tone={row.pago === "pagado" ? "paid" : "unpaid"}
          />
        </div>
      ),
    },
    { key: "fechaRegistro", label: "Fecha de Registro" },
  ];

  const coachColumns: TableColumn<ClubCoachRow>[] = [
    {
      key: "fotoUrl",
      label: "Foto",
      render: (row) => (
        <PersonAvatar
          name={row.nombre}
          photoUrl={row.fotoUrl}
          size="sm"
        />
      ),
    },
    { key: "nombre", label: "Nombre" },
    { key: "documento", label: "Numero de Documento" },
    { key: "liga", label: "Liga" },
    { key: "club", label: "Club" },
    {
      key: "estado",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={row.estado === "aprobado" ? "Aprobado" : "Pendiente"}
          tone={row.estado === "aprobado" ? "approved" : "pending"}
        />
      ),
    },
    { key: "fechaRegistro", label: "Fecha de Registro" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Clubes
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-league-400/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-emerald-200/25 blur-3xl" />

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-center rounded-3xl bg-slate-50 p-6">
              {club.logoUrl ? (
                <img
                  src={club.logoUrl}
                  alt={club.nombre}
                  className="h-24 w-24 object-contain"
                />
              ) : (
                <div
                  translate="no"
                  className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-xl font-semibold text-slate-500 shadow-sm"
                >
                  {" "}
                  {club.nombre
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusBadge
                label={
                  club.estado === "aprobado"
                    ? "Aprobado"
                    : "Pendiente"
                }
                tone={
                  club.estado === "aprobado" ? "approved" : "pending"
                }
              />
              <StatusBadge
                label={club.pago === "pagado" ? "Pagado" : "Sin pago"}
                tone={club.pago === "pagado" ? "paid" : "unpaid"}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="mt-1 text-sm font-semibold text-slate-800">
                {club.liga}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Club
              </div>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                {club.nombre}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {club.municipio} · {club.barrio}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Direccion
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800">
                  {club.direccion}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Contacto
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800">
                  {club.telefono1}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {club.correo}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Municipio
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800">
                  {club.municipio}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Presidente
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800">
                  {club.presidente}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Documentos
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-800">
                  {documents.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Deportistas
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-800">
                  {athletes.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Entrenadores
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-800">
                  {coaches.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sub-nav */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Navegacion
            </div>

            {/* Mobile select */}
            <div className="mt-3 lg:hidden">
              <select
                value={tab}
                onChange={(e) => setTab(e.target.value as DetailTab)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="documents">
                  Documentos ({documents.length})
                </option>
                <option value="athletes">
                  Deportistas ({athletes.length})
                </option>
                <option value="coaches">
                  Entrenadores ({coaches.length})
                </option>
              </select>
            </div>

            {/* Desktop nav */}
            <div className="mt-3 hidden lg:flex lg:flex-col gap-2">
              {[
                {
                  id: "documents",
                  label: "Documentos",
                  count: documents.length,
                },
                {
                  id: "athletes",
                  label: "Deportistas",
                  count: athletes.length,
                },
                {
                  id: "coaches",
                  label: "Entrenadores",
                  count: coaches.length,
                },
              ].map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id as DetailTab)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-league-700 text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 space-y-4">
            {tab === "documents" && (
              <>
                <div className="hidden md:block">
                  <Table columns={documentColumns} data={documents} />
                </div>
                <DocumentsCardsMobile rows={documents} />
              </>
            )}

            {tab === "athletes" && (
              <>
                <AthletesTableDesktop
                  rows={pagedAthletes}
                  columns={athleteColumns}
                />
                <AthletesCardsMobile rows={pagedAthletes} />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Mostrando {pagedAthletes.length} de{" "}
                    {athletes.length}
                  </span>

                  {athletes.length > pageSize && (
                    <Pagination
                      page={athletePage}
                      pageSize={pageSize}
                      total={athletes.length}
                      onPageChange={setAthletePage}
                    />
                  )}
                </div>
              </>
            )}

            {tab === "coaches" && (
              <>
                <CoachesTableDesktop
                  rows={pagedCoaches}
                  columns={coachColumns}
                />
                <CoachesCardsMobile rows={pagedCoaches} />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Mostrando {pagedCoaches.length} de{" "}
                    {coaches.length}
                  </span>

                  {coaches.length > pageSize && (
                    <Pagination
                      page={coachPage}
                      pageSize={pageSize}
                      total={coaches.length}
                      onPageChange={setCoachPage}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubDetail;
