import { useMemo, useState } from "react";
import type { Coach } from "../../../app/types/coaches";
import { coaches } from "../../../app/mocks/coaches";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import StatusBadge from "../../../ui/StatusBadge";
import CoachAvatar from "../components/CoachAvatar";
import CoachesCardsMobile from "../components/CoachesCardsMobile";
import CoachDetail from "../components/CoachDetail";

const EntrenadoresPage = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("todos");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pageSize = 10;

  const departments = useMemo(
    () => Array.from(new Set(coaches.map((c) => c.department))),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return coaches.filter((c) => {
      const matchesSearch =
        q === "" ||
        c.fullName.toLowerCase().includes(q) ||
        c.documentNumber.includes(search);

      const matchesDept =
        department === "todos" || c.department === department;

      return matchesSearch && matchesDept;
    });
  }, [search, department]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const selectedCoach = selectedId
    ? coaches.find((c) => c.id === selectedId)
    : null;

  if (selectedCoach) {
    return (
      <CoachDetail
        coach={selectedCoach as Coach}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const columns: TableColumn<Coach>[] = [
    { key: "id", label: "ID" },
    {
      key: "photoUrl",
      label: "Foto",
      render: (row) => (
        <CoachAvatar
          name={row.fullName}
          photoUrl={row.photoUrl}
          size="sm"
        />
      ),
    },
    { key: "fullName", label: "Nombre" },
    { key: "documentNumber", label: "Numero de Documento" },
    { key: "league", label: "Liga" },
    { key: "club", label: "Club" },
    { key: "category", label: "Categoria" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={row.status === "aprobado" ? "Aprobado" : "Pendiente"}
          tone={row.status === "aprobado" ? "approved" : "pending"}
        />
      ),
    },
    {
      key: "phone",
      label: "Ver",
      render: (row) => (
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          onClick={() => setSelectedId(row.id)}
        >
          i
        </button>
      ),
    },
  ];

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold text-league-700">
          Entrenadores
        </h1>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_auto]">
          <Input
            placeholder="Nombre o Documento"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <Select
            value={department}
            onChange={(event) => {
              setDepartment(event.target.value);
              setPage(1);
            }}
          >
            <option value="todos">Departamento</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setDepartment("todos");
              setPage(1);
            }}
          >
            Restablecer
          </Button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card-soft">
        <div className="hidden md:block">
          <Table columns={columns} data={paged} />
        </div>

        <CoachesCardsMobile rows={paged} onView={setSelectedId} />

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
    </section>
  );
};

export default EntrenadoresPage;
