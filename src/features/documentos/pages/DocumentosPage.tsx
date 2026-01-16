import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
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

  if (selected) {
    return (
      <DocumentoDetalle
        document={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  const columns: TableColumn<Documento>[] = [
    { key: "type", label: "Tipo de Documento" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={row.status === "approved" ? "Aprobado" : "Pendiente"}
          tone={row.status === "approved" ? "approved" : "pending"}
        />
      ),
    },
    {
      key: "id",
      label: "Ver",
      render: (row) => (
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          onClick={() => setSelected(row)}
          aria-label="Ver documento"
        >
          i
        </button>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Documentos
        </h1>
        <Button className="bg-sky-600 hover:bg-sky-700">
          Agregar Documento
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card-soft space-y-4">
        <div className="hidden lg:block">
          <Table
            columns={columns}
            data={pagedDocuments}
            emptyMessage="No hay documentos registrados"
          />
        </div>

        <DocumentsCardsMobile
          items={pagedDocuments}
          onView={setSelected}
        />

        <div className="flex items-center justify-between text-xs text-slate-500">
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
