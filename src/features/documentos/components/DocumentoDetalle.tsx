import Button from "../../../ui/Button";
import StatusBadge from "../../../ui/StatusBadge";
import type { Documento } from "../types";

type Props = {
  document: Documento;
  onBack: () => void;
};

const DocumentoDetalle = ({ document, onBack }: Props) => {
  const isApproved = document.status === "approved";
  const statusLabel = isApproved ? "Aprobado" : "Pendiente";

  const startDate = document.startDate ?? "-";
  const endDate = document.endDate ?? "-";
  const resolution = document.resolutionNumber ?? "-";
  const documentCode = document.id.replace("doc-", "");

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Documento
          </p>
          <h1 className="text-xl font-semibold text-league-700">
            {document.type}
          </h1>
          <p className="text-sm text-slate-500">
            Codigo {documentCode}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onBack}>
            Atras
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Detalle
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {document.type}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">
                ID {documentCode}
              </span>
              {resolution !== "-" && (
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  Res {resolution}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Vigencia
            </p>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                Inicio: {startDate}
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                Fin: {endDate}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Acciones
            </p>
            <div className="mt-3 grid gap-2 text-xs">
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Abrir en nueva pestana
              </a>
              <a
                href={document.fileUrl}
                download
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Descargar
              </a>
            </div>
          </div>
        </aside>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Visor
              </p>
              <p className="text-sm font-semibold text-slate-700">
                Vista previa
              </p>
            </div>
            <StatusBadge
              label={statusLabel}
              tone={isApproved ? "approved" : "pending"}
            />
          </div>

          <div className="mt-4">
            {document.fileUrl ? (
              <iframe
                title={`document-${document.id}`}
                src={`${document.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="h-[560px] w-full rounded-xl border border-slate-200 bg-white"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                No hay archivo cargado
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentoDetalle;
