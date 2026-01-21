import { useMemo, useState } from "react";
import type { Championship, ChampionshipStatus } from "../types";
import {
  championships,
  championshipPlayers,
  championshipClubRegistrations,
} from "../mocks";
import { clubs } from "../../clubes/mocks";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import Select from "../../../ui/Select";
import Pagination from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import StatusBadge from "../../../ui/StatusBadge";
import ChampionshipsCardsMobile from "../components/ChampionshipsCardsMobile";
import CampeonatoDetalle from "../components/CampeonatoDetalle";

const statusLabel: Record<ChampionshipStatus, string> = {
  "en-curso": "En curso",
  programado: "Programado",
  finalizado: "Finalizado",
};

const statusTone: Record<
  ChampionshipStatus,
  "approved" | "pending" | "info"
> = {
  "en-curso": "approved",
  programado: "pending",
  finalizado: "info",
};
const emptyForm = {
  name: "",
  city: "",
  startDate: "",
  endDate: "",
  category: "",
  status: "programado" as ChampionshipStatus,
  registered: false,
  enrollmentOpen: true,
};

const CampeonatosPage = () => {
  const [items, setItems] = useState<Championship[]>(championships);
  const [selected, setSelected] = useState<Championship | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Championship | null>(null);
  const [form, setForm] = useState(emptyForm);

  const [search, setSearch] = useState("");
  const pageSize = 6;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [search, items]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handleOpenCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: Championship) => {
    setEditing(item);
    setForm({
      name: item.name,
      city: item.city,
      startDate: item.startDate,
      endDate: item.endDate,
      category: item.category,
      status: item.status,
      registered: item.registered,
      enrollmentOpen: item.enrollmentOpen,
    });

    setModalOpen(true);
  };

  const handleDelete = (item: Championship) => {
    const ok = window.confirm(`Eliminar el torneo "${item.name}"?`);
    if (!ok) return;
    setItems((prev) => prev.filter((row) => row.id !== item.id));
    if (selected?.id === item.id) {
      setSelected(null);
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: Championship = {
      id:
        editing?.id ??
        globalThis.crypto?.randomUUID?.() ??
        `ch-${Date.now()}`,
      name: form.name.trim(),
      city: form.city.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      category: form.category.trim(),
      status: form.status,
      registered: form.registered,
      enrollmentOpen: form.enrollmentOpen,
    };

    if (!payload.name || !payload.city || !payload.category) {
      return;
    }

    if (editing) {
      setItems((prev) =>
        prev.map((row) => (row.id === editing.id ? payload : row))
      );
    } else {
      setItems((prev) => [payload, ...prev]);
    }

    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setPage(1);
  };

  const handleView = (id: string) => {
    const item = items.find((row) => row.id === id);
    if (item) setSelected(item);
  };

  const columns: TableColumn<Championship>[] = [
    {
      key: "name",
      label: "Nombre",
      className: "w-[30%]",
      render: (row) => (
        <div className="font-semibold text-slate-800">{row.name}</div>
      ),
    },
    {
      key: "city",
      label: "Ciudad",
    },
    {
      key: "startDate",
      label: "Inicio",
    },
    {
      key: "endDate",
      label: "Fin",
    },
    {
      key: "category",
      label: "Categoria",
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={statusLabel[row.status]}
          tone={statusTone[row.status]}
        />
      ),
    },
    {
      key: "id",
      label: "Acciones",
      className: "min-w-[220px]",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="info"
            size="sm"
            onClick={() => setSelected(row)}
          >
            Ver inscripciones
          </Button>
          <Button
            variant="edit"
            size="sm"
            onClick={() => handleOpenEdit(row)}
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

  if (selected) {
    const registeredClubIds = championshipClubRegistrations
      .filter((reg) => reg.championshipId === selected.id)
      .map((reg) => reg.clubId);

    return (
      <CampeonatoDetalle
        championship={selected}
        clubs={clubs}
        registeredClubIds={registeredClubIds}
        players={championshipPlayers.filter(
          (p) => p.championshipId === selected.id
        )}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-league-700">
            Torneos
          </h1>
          <p className="text-xs text-slate-500">
            Gestiona los torneos activos e historicos.
          </p>
        </div>
        <Button onClick={handleOpenCreate}>Crear torneo</Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Buscar por nombre, ciudad o categoria"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
          <div className="hidden md:block">
            <Table
              columns={columns}
              data={paged}
              emptyMessage="No hay torneos registrados"
            />
          </div>

          <ChampionshipsCardsMobile
            rows={paged}
            onView={handleView}
            onEdit={handleOpenEdit}
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
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Editar torneo" : "Nuevo torneo"}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
          setForm(emptyForm);
        }}
      >
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Nombre del torneo
            </label>
            <Input
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              placeholder="Ej: Liga Cesar 2026"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Ciudad
              </label>
              <Input
                value={form.city}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    city: event.target.value,
                  }))
                }
                placeholder="Ej: Valledupar"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Categoria
              </label>
              <Input
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
                placeholder="Ej: Sub-17 (2008-2009)"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Fecha inicio
              </label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    startDate: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Fecha fin
              </label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    endDate: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Estado
              </label>
              <Select
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    status: event.target.value as ChampionshipStatus,
                  }))
                }
              >
                <option value="programado">Programado</option>
                <option value="en-curso">En curso</option>
                <option value="finalizado">Finalizado</option>
              </Select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Inscripcion
              </label>
              <Select
                value={form.enrollmentOpen ? "abierta" : "cerrada"}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    enrollmentOpen: event.target.value === "abierta",
                  }))
                }
              >
                <option value="abierta">Abierta</option>
                <option value="cerrada">Cerrada</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setModalOpen(false);
                setEditing(null);
                setForm(emptyForm);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editing ? "Guardar cambios" : "Crear torneo"}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default CampeonatosPage;
