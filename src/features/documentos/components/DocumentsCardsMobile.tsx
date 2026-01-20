import StatusBadge from "../../../ui/StatusBadge";
import Button from "../../../ui/Button";
import ButtonLink from "../../../ui/ButtonLink";

import type { Documento } from "../types";

type Props = {
  items: Documento[];
  onView: (doc: Documento) => void;
};

const DocumentsCardsMobile = ({ items, onView }: Props) => {
  return (
    <div className="space-y-3 lg:hidden">
      {items.map((doc) => {
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
            className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  Documento
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-800">
                  {doc.type}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{meta}</p>
              </div>
              <StatusBadge
                label={isApproved ? "Aprobado" : "Pendiente"}
                tone={isApproved ? "approved" : "pending"}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="info"
                size="sm"
                className="flex-1"
                onClick={() => onView(doc)}
              >
                Ver detalle
              </Button>
              <ButtonLink
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                size="sm"
                className="flex-1 rounded-full"
              >
                Abrir
              </ButtonLink>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default DocumentsCardsMobile;
