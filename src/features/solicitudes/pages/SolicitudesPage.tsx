import { useState } from "react";
import Modal from "../../../ui/Modal";
import type { Solicitud } from "../types/solicitudes";
import StatusBadge from "../../../ui/StatusBadge";
import SolicitudesCardsMobile from "../components/SolicitudesCardsMobile";
import { solicitudes } from "../mocks";

const statusConfig = {
  pendiente: { label: "Pendiente", tone: "pending" },
  aprobado: { label: "Aprobado", tone: "approved" },
  rechazado: { label: "Rechazado", tone: "unpaid" },
} as const;

const tableHeaders = [
  "Tipo Solicitud",
  "Nombre",
  "Tipo de Usuario",
  "Estado",
  "Fecha Solicitud",
  "Ver",
];

const SolicitudesPage = () => {
  const [selected, setSelected] = useState<Solicitud | null>(null);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-league-700">
          Solicitudes
        </h1>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-card-soft p-4 space-y-4">
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-5 py-4 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {solicitudes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-5 py-6"
                    >
                      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm text-blue-700">
                        No hay solicitudes pendientes
                      </div>
                    </td>
                  </tr>
                ) : (
                  solicitudes.map((row) => {
                    const status = statusConfig[row.estado];
                    return (
                      <tr
                        key={row.id}
                        className="border-t border-slate-100"
                      >
                        <td className="px-5 py-4">{row.tipo}</td>
                        <td className="px-5 py-4">{row.nombre}</td>
                        <td className="px-5 py-4">{row.rol}</td>
                        <td className="px-5 py-4">
                          <StatusBadge
                            label={status.label}
                            tone={status.tone}
                          />
                        </td>
                        <td className="px-5 py-4">{row.fecha}</td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                            aria-label="Ver solicitud"
                            onClick={() => setSelected(row)}
                          >
                            i
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <SolicitudesCardsMobile
          rows={solicitudes}
          onView={setSelected}
        />
      </div>

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          title="Detalle de solicitud"
        >
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl bg-league-sweep p-4 text-white shadow-lg">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                  Solicitud
                </div>
                <div className="mt-2 text-lg font-semibold">
                  {selected.nombre}
                </div>
                <div className="mt-1 text-sm text-white/85">
                  {selected.rol}
                </div>
                <span className="mt-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
                  {selected.tipo}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Estado
                </div>
                <div className="mt-2">
                  {(() => {
                    const status = statusConfig[selected.estado];
                    return (
                      <StatusBadge
                        label={status.label}
                        tone={status.tone}
                      />
                    );
                  })()}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Fecha
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  {selected.fecha}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Registro en plataforma
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Resumen
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Solicitud de {selected.tipo.toLowerCase()} para{" "}
                {selected.rol.toLowerCase()}. Revisa la informacion y
                aplica la validacion correspondiente.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default SolicitudesPage;
