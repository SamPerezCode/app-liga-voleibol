import { useMemo, useState } from "react";
import type { Coach } from "../../../app/types/coaches";
import { coaches } from "../../../app/mocks/coaches";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Pagination from "../../../ui/Pagination";
import CoachesCardsMobile from "../components/CoachesCardsMobile";
import CoachDetail from "../components/CoachDetail";
import CoachesTableDesktop from "../components/CoachesTableDesktop";
import ResetButton from "../../../ui/ResetButton";

const EntrenadoresPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pageSize = 10;

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return coaches.filter((c) => {
      const matchesSearch =
        q === "" ||
        c.fullName.toLowerCase().includes(q) ||
        c.documentNumber.includes(search) ||
        c.city.toLowerCase().includes(q);

      const matchesStatus = status === "todos" || c.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

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

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold text-league-700">
          Entrenadores
        </h1>

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
                placeholder="Buscar por nombre, documento o municipio"
                value={search}
                onChange={handleSearchChange}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-3 md:contents">
              <div className="flex-1 min-w-[180px]">
                <Select value={status} onChange={handleStatusChange}>
                  <option value="todos">Estado</option>
                  <option value="aprobado">Aprobado</option>
                  <option value="pendiente">Pendiente</option>
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
            Filtra entrenadores por nombre, documento o municipio y
            estado.
          </p>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card-soft">
        <div className="hidden md:block">
          <CoachesTableDesktop rows={paged} onView={setSelectedId} />
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
