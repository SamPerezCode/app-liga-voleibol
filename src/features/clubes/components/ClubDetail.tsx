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

type Props = {
  club: Club;
  documents: ClubDocument[];
  athletes: ClubAthleteRow[];
  coaches: ClubCoachRow[];
  onBack: () => void;
};

const statusBadge = (estado: string) =>
  estado === "aprobado"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-amber-100 text-amber-700";

const ClubDetail = ({
  club,
  documents,
  athletes,
  coaches,
  onBack,
}: Props) => {
  const [openSection, setOpenSection] = useState({
    documents: false,
    athletes: false,
    coaches: false,
  });

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
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(
            row.estado
          )}`}
        >
          {row.estado === "aprobado" ? "Aprobado" : "Pendiente"}
        </span>
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
      render: (row) =>
        row.fotoUrl ? (
          <img
            src={row.fotoUrl}
            alt={row.nombre}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-slate-100" />
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
      render: (row) =>
        row.fotoUrl ? (
          <img
            src={row.fotoUrl}
            alt={row.nombre}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-slate-100" />
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
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(
            row.estado
          )}`}
        >
          {row.estado === "aprobado" ? "Aprobado" : "Pendiente"}
        </span>
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

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
          <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-6">
            {club.logoUrl ? (
              <img
                src={club.logoUrl}
                alt={club.nombre}
                className="h-24 w-24 object-contain"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-xl font-semibold text-slate-500 shadow-sm">
                {club.nombre
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-slate-400">
                Nombre
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {club.nombre}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Departamento
              </p>
              <p className="text-sm text-slate-700">
                {club.departamento}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Municipio
              </p>
              <p className="text-sm text-slate-700">
                {club.municipio}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Barrio
              </p>
              <p className="text-sm text-slate-700">{club.barrio}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Direccion
              </p>
              <p className="text-sm text-slate-700">
                {club.direccion}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Telefono 1
              </p>
              <p className="text-sm text-slate-700">
                {club.telefono1}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Correo
              </p>
              <p className="text-sm text-slate-700">{club.correo}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">
                Estado
              </p>
              <div className="mt-1 flex gap-2">
                <StatusBadge
                  label={
                    club.estado === "aprobado"
                      ? "Aprobado"
                      : "Pendiente"
                  }
                  tone={
                    club.estado === "aprobado"
                      ? "approved"
                      : "pending"
                  }
                />
                <StatusBadge
                  label={
                    club.pago === "pagado" ? "Pagado" : "Sin pago"
                  }
                  tone={club.pago === "pagado" ? "paid" : "unpaid"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
          onClick={() =>
            setOpenSection((prev) => ({
              ...prev,
              documents: !prev.documents,
            }))
          }
        >
          Documentos
          <span>{openSection.documents ? "▲" : "▼"}</span>
        </button>
        {openSection.documents && (
          <div className="rounded-xl border border-slate-200 bg-white/70 p-4">
            <Table columns={documentColumns} data={documents} />
          </div>
        )}

        <button
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
          onClick={() =>
            setOpenSection((prev) => ({
              ...prev,
              athletes: !prev.athletes,
            }))
          }
        >
          Deportistas
          <span>{openSection.athletes ? "▲" : "▼"}</span>
        </button>
        {openSection.athletes && (
          <div className="rounded-xl border border-slate-200 bg-white/70 p-4 space-y-4">
            <Table columns={athleteColumns} data={pagedAthletes} />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Mostrando {pagedAthletes.length} de {athletes.length}
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
          </div>
        )}

        <button
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
          onClick={() =>
            setOpenSection((prev) => ({
              ...prev,
              coaches: !prev.coaches,
            }))
          }
        >
          Entrenadores
          <span>{openSection.coaches ? "▲" : "▼"}</span>
        </button>
        {openSection.coaches && (
          <div className="rounded-xl border border-slate-200 bg-white/70 p-4 space-y-4">
            <Table columns={coachColumns} data={pagedCoaches} />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Mostrando {pagedCoaches.length} de {coaches.length}
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
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubDetail;
