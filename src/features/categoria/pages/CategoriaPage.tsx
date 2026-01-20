import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import ResetButton from "../../../ui/ResetButton";
import Pagination from "../../../ui/Pagination";
import CategoriasCardsMobile from "../components/CategoriasCardsMobile";
import CategoriaDetail from "../components/CategoriaDetail";
import { categorias } from "../mocks/mocks";
import type { Categoria } from "../type/types";
import { athletes } from "../../../app/mocks/athletes";
import { coaches } from "../../../app/mocks/coaches";

const statusStyles: Record<Categoria["status"], string> = {
  activa: "bg-emerald-100 text-emerald-700",
  inactiva: "bg-slate-100 text-slate-600",
};

const emptyForm = {
  nombre: "",
  edadMin: "",
  edadMax: "",
};

const normalizeText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const formatRangeLabel = (item: Categoria) =>
  item.edadMax >= 99
    ? `Edad ${item.edadMin}+`
    : `Edad ${item.edadMin} - ${item.edadMax}`;

const isAgeInRange = (
  birthDate: string,
  min: number,
  max: number
) => {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasNotHadBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());

  if (hasNotHadBirthday) age -= 1;

  const maxValue = max >= 99 ? Number.POSITIVE_INFINITY : max;
  return age >= min && age <= maxValue;
};

const CategoriaPage = () => {
  const [items, setItems] = useState<Categoria[]>(categorias);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const pageSize = 6;
  const [page, setPage] = useState(1);

  const selectedCategoria = selectedId
    ? (items.find((item) => item.id === selectedId) ?? null)
    : null;

  const athletesForCategory = useMemo(() => {
    if (!selectedCategoria) return [];
    return athletes.filter((athlete) => {
      if (athlete.categoryId) {
        return athlete.categoryId === selectedCategoria.id;
      }
      return isAgeInRange(
        athlete.birthDate,
        selectedCategoria.edadMin,
        selectedCategoria.edadMax
      );
    });
  }, [selectedCategoria]);

  const coachesForCategory = useMemo(() => {
    if (!selectedCategoria) return [];
    return coaches.filter((coach) => {
      if (coach.categoryId) {
        return coach.categoryId === selectedCategoria.id;
      }
      return normalizeText(coach.category).includes(
        normalizeText(selectedCategoria.nombre)
      );
    });
  }, [selectedCategoria]);

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
      const rangeText = formatRangeLabel(item).toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        item.nombre.toLowerCase().includes(q) ||
        rangeText.includes(q);

      const matchesStatus =
        status === "todos" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const columns: TableColumn<Categoria>[] = [
    {
      key: "nombre",
      label: "Categoria",
      className: "w-[55%]",
      render: (row) => (
        <div>
          <div className="text-sm font-semibold text-slate-700">
            {row.nombre}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            {formatRangeLabel(row)}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Estado",
      className: "w-[15%]",
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
      className: "w-[30%]",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="info"
            size="sm"
            onClick={() => setSelectedId(row.id)}
          >
            Ver
          </Button>
          <Button
            variant="edit"
            size="sm"
            onClick={() => openEdit(row)}
          >
            Editar
          </Button>
          <Button
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

  if (selectedCategoria) {
    return (
      <CategoriaDetail
        categoria={selectedCategoria}
        athletes={athletesForCategory}
        coaches={coachesForCategory}
        onBack={() => setSelectedId(null)}
      />
    );
  }

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
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-3 md:contents">
              <div className="flex-1 min-w-[180px]">
                <Select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                  }}
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
                  setPage(1);
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
            data={paged}
            emptyMessage="No hay categorias registradas"
          />
        </div>

        <CategoriasCardsMobile
          rows={paged}
          onView={(row) => setSelectedId(row.id)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
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
