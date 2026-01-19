import { useMemo, useState } from "react";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Pagination from "../../../ui/Pagination";
import {
  clubs,
  clubAthletes,
  clubCoaches,
  clubDocuments,
} from "../mocks";
import ClubCard from "../components/ClubCard";
import ClubDetail from "../components/ClubDetail";
import ResetButton from "../../../ui/ResetButton";

const ClubesPage = () => {
  const [selectedClubId, setSelectedClubId] = useState<string | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");
  const pageSize = 6;
  const [page, setPage] = useState(1);

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

  const filteredClubs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesSearch =
        q.length === 0 ||
        club.nombre.toLowerCase().includes(q) ||
        club.municipio.toLowerCase().includes(q);

      const matchesStatus =
        status === "todos" || club.estado === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const pagedClubs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClubs.slice(start, start + pageSize);
  }, [filteredClubs, page]);

  if (selectedClubId) {
    const club = clubs.find((item) => item.id === selectedClubId);
    if (!club) return null;

    return (
      <ClubDetail
        club={club}
        documents={clubDocuments.filter(
          (doc) => doc.clubId === club.id
        )}
        athletes={clubAthletes.filter(
          (ath) => ath.clubId === club.id
        )}
        coaches={clubCoaches.filter(
          (coach) => coach.clubId === club.id
        )}
        onBack={() => setSelectedClubId(null)}
      />
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-4">
        <h1 className="text-xl font-semibold text-league-700">
          Clubes
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
                placeholder="Buscar por nombre o municipio"
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
            Busca clubes por nombre o municipio y filtra por estado.
          </p>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pagedClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => setSelectedClubId(club.id)}
          />
        ))}
      </div>

      {filteredClubs.length > pageSize && (
        <div className="flex justify-end">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredClubs.length}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  );
};

export default ClubesPage;
