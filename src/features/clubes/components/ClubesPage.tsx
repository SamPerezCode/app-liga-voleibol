import { useMemo, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
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
            onChange={(event) => setSearch(event.target.value)}
          />
          <Select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="todos">Departamento</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
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
            }}
          >
            Restablecer
          </Button>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => setSelectedClubId(club.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ClubesPage;
