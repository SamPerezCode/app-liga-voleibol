import Button from "../../../ui/Button";
import type { Documento } from "../types";

type Props = {
  document: Documento;
  onBack: () => void;
};

const DocumentoDetalle = ({ document, onBack }: Props) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Documento N. {document.id.replace("doc-", "")}
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <div className="space-y-2">
          <p className="text-xs uppercase text-slate-400">
            Tipo de documento
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {document.type}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase text-slate-400">
            Documento
          </p>
          <iframe
            title={`document-${document.id}`}
            src={`${document.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="h-[520px] w-full rounded-xl border border-slate-200 bg-white"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-xs uppercase text-slate-400">
              Fecha de inicio
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {document.startDate ?? "-"}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Fecha de vencimiento
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {document.endDate ?? "-"}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-400">
              Numero de resolucion o categoria
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {document.resolutionNumber ?? "-"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentoDetalle;
