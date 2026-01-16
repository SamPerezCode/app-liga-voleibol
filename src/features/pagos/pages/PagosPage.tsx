import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import StatusBadge from "../../../ui/StatusBadge";
import PaymentsCardsMobile from "../components/PaymentsCardsMobile";
import { payments } from "../mocks";
import type { Payment } from "../types";

const pageSize = 5;

const formatMoney = (value: number) =>
  value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const PagosPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        search.trim().length === 0 ||
        p.reference.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "todos" || p.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const columns: TableColumn<Payment>[] = [
    { key: "type", label: "Tipo de Pago" },
    {
      key: "amount",
      label: "Monto",
      render: (row) => formatMoney(row.amount),
    },
    { key: "reference", label: "Referencia" },
    { key: "method", label: "Metodo de Pago" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={
            row.status === "paid"
              ? "Pagado"
              : row.status === "pending"
              ? "Pendiente"
              : "Sin pago"
          }
          tone={
            row.status === "paid"
              ? "paid"
              : row.status === "pending"
              ? "pending"
              : "unpaid"
          }
        />
      ),
    },
    { key: "paidAt", label: "Fecha de Pago" },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold text-league-700">
        Historial de Pagos
      </h1>

      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_auto]">
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="todos">Seleccione una opcion</option>
          <option value="paid">Pagado</option>
          <option value="pending">Pendiente</option>
          <option value="unpaid">Sin pago</option>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setStatus("todos");
            setPage(1);
          }}
        >
          Restablecer
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card-soft space-y-4">
        <div className="hidden lg:block">
          <Table
            columns={columns}
            data={paged}
            emptyMessage="No hay pagos registrados"
          />
        </div>

        <PaymentsCardsMobile items={paged} />

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando {paged.length} de {filtered.length}
          </span>
          {filtered.length > pageSize && (
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filtered.length}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PagosPage;
