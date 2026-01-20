import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import ButtonLink from "../../../ui/ButtonLink";
import StatusBadge from "../../../ui/StatusBadge";
import Pagination from "../../../ui/Pagination";
import type { Documento } from "../types";
import { documents } from "../mocks";
import DocumentoDetalle from "../components/DocumentoDetalle";
import DocumentsCardsMobile from "../components/DocumentsCardsMobile";

const pageSize = 5;

const DocumentosPage = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Documento | null>(null);

  const pagedDocuments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return documents.slice(start, start + pageSize);
  }, [page]);

  const total = documents.length;
  const approved = documents.filter(
    (doc) => doc.status === "approved"
  ).length;
  const pending = total - approved;

  if (selected) {
    return (
      <DocumentoDetalle
        document={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-league-700">
            Documentos
          </h1>
          <p className="text-sm text-slate-500">
            Control y trazabilidad de la documentacion de la liga.
          </p>
        </div>
        <Button className="bg-league-600 hover:bg-league-700">
          Agregar Documento
        </Button>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Total
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {total}
          </p>
          <p className="text-xs text-slate-500">
            Documentos registrados
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Aprobados
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {approved}
          </p>
          <p className="text-xs text-slate-500">Listos para uso</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Pendientes
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {pending}
          </p>
          <p className="text-xs text-slate-500">Por validar</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Documentos cargados
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Registro general
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            {total} archivos
          </span>
        </div>

        <div className="mt-4 hidden lg:flex flex-col gap-3">
          {pagedDocuments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500">
              No hay documentos registrados
            </div>
          ) : (
            pagedDocuments.map((doc) => {
              const metaParts = [];
              if (doc.startDate && doc.endDate) {
                metaParts.push(
                  `Vigencia ${doc.startDate} - ${doc.endDate}`
                );
              }
              if (doc.resolutionNumber) {
                metaParts.push(`Resolucion ${doc.resolutionNumber}`);
              }
              const meta =
                metaParts.length > 0
                  ? metaParts.join(" · ")
                  : "Sin detalles adicionales";

              const isApproved = doc.status === "approved";

              return (
                <article
                  key={doc.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft transition hover:-translate-y-0.5 hover:shadow-card-soft"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-league-sweep" />
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500">
                        DOC
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Documento
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-800">
                          {doc.type}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {meta}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        label={isApproved ? "Aprobado" : "Pendiente"}
                        tone={isApproved ? "approved" : "pending"}
                      />
                      <Button
                        type="button"
                        variant="info"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSelected(doc)}
                      >
                        Ver detalle
                      </Button>
                      <ButtonLink
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Abrir
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <DocumentsCardsMobile
          items={pagedDocuments}
          onView={setSelected}
        />

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando {pagedDocuments.length} de {documents.length}
          </span>
          {documents.length > pageSize && (
            <Pagination
              page={page}
              pageSize={pageSize}
              total={documents.length}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentosPage;
