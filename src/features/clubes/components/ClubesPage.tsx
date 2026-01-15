import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
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

const ClubesPage = () => {
  const [selectedClubId, setSelectedClubId] = useState<string | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("todos");
  const [status, setStatus] = useState("todos");
  const pageSize = 6;
  const [page, setPage] = useState(1);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartment(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const departments = useMemo(() => {
    return Array.from(
      new Set(clubs.map((club) => club.departamento))
    );
  }, []);

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        search.trim().length === 0 ||
        club.nombre.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        department === "todos" || club.departamento === department;

      const matchesStatus =
        status === "todos" || club.estado === status;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [search, department, status]);

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
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
          <Input
            placeholder="Nombre"
            value={search}
            onChange={handleSearchChange}
          />
          <Select
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="todos">Departamento</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={handleStatusChange}>
            <option value="todos">Estado</option>
            <option value="aprobado">Aprobado</option>
            <option value="pendiente">Pendiente</option>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setDepartment("todos");
              setStatus("todos");
              setPage(1);
            }}
          >
            Restablecer
          </Button>
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
