import { useMemo, useState } from "react";
import type { Athlete } from "../../../app/types/athletes";
import { athletes } from "../../../app/mocks/athletes";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Pagination from "../../../ui/Pagination";

import AthletesCardsMobile from "../components/AthletesCardsMobile";
import AthleteDetail from "../components/AthleteDetail";
import AthletesTableDesktop from "../components/AthletesTableDesktop";

const DeportistasPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const pageSize = 8;

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
    return athletes.filter((a) => {
      const matchesSearch =
        q === "" ||
        a.fullName.toLowerCase().includes(q) ||
        a.documentNumber.includes(search) ||
        a.residenceCity.toLowerCase().includes(q);

      const matchesStatus = status === "todos" || a.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

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

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold text-league-700">
          Deportistas
        </h1>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
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

            <div className="min-w-[180px]">
              <Select value={status} onChange={handleStatusChange}>
                <option value="todos">Estado</option>
                <option value="aprobado">Aprobado</option>
                <option value="pendiente">Pendiente</option>
              </Select>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatus("todos");
                setPage(1);
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              aria-label="Restablecer filtros"
              title="Restablecer filtros"
            >
              <img
                src="/refresh.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 opacity-90 filter brightness-75 contrast-125"
              />
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Filtra deportistas por nombre, documento o municipio y
            estado.
          </p>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-card-soft">
        <div className="hidden md:block">
          <AthletesTableDesktop rows={paged} onView={setSelectedId} />
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
