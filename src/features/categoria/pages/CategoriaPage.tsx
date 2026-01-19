import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import ResetButton from "../../../ui/ResetButton";
import CategoriasCardsMobile from "../components/CategoriasCardsMobile";
import { categorias } from "../mocks/mocks";
import type { Categoria } from "../type/types";

const statusStyles: Record<Categoria["status"], string> = {
  activa: "bg-emerald-100 text-emerald-700",
  inactiva: "bg-slate-100 text-slate-600",
};

const emptyForm = {
  nombre: "",
  edadMin: "",
  edadMax: "",
};

const CategoriaPage = () => {
  const [items, setItems] = useState<Categoria[]>(categorias);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item: Categoria) => {
    setEditing(item);
    setForm({
      nombre: item.nombre,
      edadMin: String(item.edadMin),
      edadMax: String(item.edadMax),
    });
    setError("");
    setModalOpen(true);
  };

  const handleSave = () => {
    const nombre = form.nombre.trim();
    const edadMin = Number(form.edadMin);
    const edadMax = Number(form.edadMax);

    if (!nombre) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!Number.isFinite(edadMin) || !Number.isFinite(edadMax)) {
      setError("El rango de edad es invalido.");
      return;
    }

    if (edadMin < 0 || edadMax < 0) {
      setError("La edad no puede ser negativa.");
      return;
    }

    if (edadMin > edadMax) {
      setError("La edad minima no puede ser mayor que la maxima.");
      return;
    }

    if (editing) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editing.id
            ? { ...item, nombre, edadMin, edadMax }
            : item
        )
      );
    } else {
      const newId =
        globalThis.crypto?.randomUUID?.() ?? `cat-${Date.now()}`;
      setItems((prev) => [
        {
          id: newId,
          nombre,
          edadMin,
          edadMax,
          status: "activa",
        },
        ...prev,
      ]);
    }

    setModalOpen(false);
  };

  const handleDelete = (item: Categoria) => {
    const ok = window.confirm(
      `Eliminar la categoria "${item.nombre}"?`
    );
    if (!ok) return;
    setItems((prev) => prev.filter((row) => row.id !== item.id));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const rangeText = `${item.edadMin}-${item.edadMax}`;
      const matchesSearch =
        q.length === 0 ||
        item.nombre.toLowerCase().includes(q) ||
        rangeText.includes(q);

      const matchesStatus =
        status === "todos" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

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
            Edad {row.edadMin} - {row.edadMax}
          </div>
        </div>
      ),
    },
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
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openEdit(row)}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-league-700">
              Categoria
            </h1>
            <p className="text-sm text-slate-500">
              Gestiona las categorias que usan clubes y deportistas.
            </p>
          </div>
          <Button
            className="bg-league-600 hover:bg-league-700"
            onClick={openCreate}
          >
            Nueva categoria
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <Input
                placeholder="Buscar categoria"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-3 md:contents">
              <div className="flex-1 min-w-[180px]">
                <Select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="todos">Estado</option>
                  <option value="activa">Activa</option>
                  <option value="inactiva">Inactiva</option>
                </Select>
              </div>
              <ResetButton
                onClick={() => {
                  setSearch("");
                  setStatus("todos");
                }}
              />
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Filtra categorias por nombre o rango de edad y estado.
          </p>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card-soft">
        <div className="hidden md:block">
          <Table
            columns={columns}
            data={filtered}
            emptyMessage="No hay categorias registradas"
          />
        </div>

        <CategoriasCardsMobile
          rows={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Editar categoria" : "Nueva categoria"}
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Nombre de la categoria
            </label>
            <Input
              value={form.nombre}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  nombre: event.target.value,
                }))
              }
              placeholder="Ej: Sub 13"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Edad minima
              </label>
              <Input
                type="number"
                min={0}
                value={form.edadMin}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    edadMin: event.target.value,
                  }))
                }
                placeholder="Ej: 11"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Edad maxima
              </label>
              <Input
                type="number"
                min={0}
                value={form.edadMax}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    edadMax: event.target.value,
                  }))
                }
                placeholder="Ej: 13"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleSave}>
              {editing ? "Guardar cambios" : "Guardar categoria"}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default CategoriaPage;
