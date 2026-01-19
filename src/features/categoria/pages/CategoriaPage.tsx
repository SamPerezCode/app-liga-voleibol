import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import { categorias } from "../mocks/mocks";
import type { Categoria } from "../type/types";
import ResetButton from "../../../ui/ResetButton";

const statusStyles: Record<Categoria["status"], string> = {
  activa: "bg-emerald-100 text-emerald-700",
  inactiva: "bg-slate-100 text-slate-600",
};

const CategoriaPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categorias.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.nombre.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q);

      const matchesStatus =
        status === "todos" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns: TableColumn<Categoria>[] = [
    {
      key: "nombre",
      label: "Categoria",
      render: (row) => (
        <div>
          <div className="text-sm font-semibold text-slate-700">
            {row.nombre}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {row.descripcion}
          </div>
        </div>
      ),
    },
    { key: "clubsCount", label: "Clubes" },
    { key: "athletesCount", label: "Deportistas" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
        >
          {row.status === "activa" ? "Activa" : "Inactiva"}
        </span>
      ),
    },
    {
      key: "id",
      label: "Acciones",
      render: () => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Editar
          </button>
          <button
            type="button"
            className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-league-700">
            Categoria
          </h1>
          <p className="text-sm text-slate-500">
            Gestiona las categorias que usan clubes y deportistas.
          </p>
        </div>
        <Button className="bg-league-600 hover:bg-league-700">
          Nueva categoria
        </Button>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-card-soft space-y-4">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_auto]">
          <Input
            placeholder="Buscar categoria..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="todos">Estado</option>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </Select>
          <ResetButton
            onClick={() => {
              setSearch("");
              setStatus("todos");
            }}
          />
        </div>

        <Table
          columns={columns}
          data={filtered}
          emptyMessage="No hay categorias registradas"
        />
      </div>
    </section>
  );
};

export default CategoriaPage;
