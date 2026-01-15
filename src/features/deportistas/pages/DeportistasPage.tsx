import { useMemo, useState } from "react";
import type { Athlete } from "../../../app/types/athletes";
import { athletes } from "../../../app/mocks/athletes";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import StatusBadge from "../../../ui/StatusBadge";
import AthleteAvatar from "../components/AthleteAvatar";
import AthletesCardsMobile from "../components/AthletesCardsMobile";
import AthleteDetail from "../components/AthleteDetail";

const DeportistasPage = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("todos");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pageSize = 8;

  const departments = useMemo(
    () => Array.from(new Set(athletes.map((a) => a.residenceDept))),
    []
  );

  const filtered = useMemo(() => {
    return athletes.filter((a) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        a.fullName.toLowerCase().includes(q) ||
        a.documentNumber.includes(search);

      const matchesDept =
        department === "todos" || a.residenceDept === department;

      return matchesSearch && matchesDept;
    });
  }, [search, department]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const selectedAthlete = selectedId
    ? athletes.find((a) => a.id === selectedId)
    : null;

  if (selectedAthlete) {
    return (
      <AthleteDetail
        athlete={selectedAthlete as Athlete}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  const columns: TableColumn<Athlete>[] = [
    { key: "id", label: "ID" },
    {
      key: "photoUrl",
      label: "Foto",
      render: (row) => (
        <AthleteAvatar
          name={row.fullName}
          photoUrl={row.photoUrl}
          size="sm"
        />
      ),
    },
    { key: "fullName", label: "Nombre" },
    { key: "documentNumber", label: "Numero de Documento" },
    { key: "club", label: "Club" },
    { key: "category", label: "Categoria" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <StatusBadge
            label={
              row.status === "aprobado" ? "Aprobado" : "Pendiente"
            }
            tone={row.status === "aprobado" ? "approved" : "pending"}
          />
          <StatusBadge
            label={row.payment === "pagado" ? "Pagado" : "Sin pago"}
            tone={row.payment === "pagado" ? "paid" : "unpaid"}
          />
        </div>
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
          Deportistas
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

        <AthletesCardsMobile rows={paged} onView={setSelectedId} />

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

export default DeportistasPage;
