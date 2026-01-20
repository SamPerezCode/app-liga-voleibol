import { useMemo, useState } from "react";
import type { ChampionshipRegistration } from "../types";
import {
  championships,
  registrations,
  championshipPlayers,
} from "../mocks";
import Input from "../../../ui/Input";
import Pagination from "../../../ui/Pagination";
import ChampionshipsCardsMobile from "../components/ChampionshipsCardsMobile";
import CampeonatoDetalle from "../components/CampeonatoDetalle";
import ChampionshipsTableDesktop from "../components/ChampionshipsTableDesktop";

const CampeonatosPage = () => {
  const [openSection, setOpenSection] = useState({
    inscritos: true,
    noInscritos: false,
  });

  const [selectedChampionshipId, setSelectedChampionshipId] =
    useState<string | null>(null);

  const [search, setSearch] = useState("");
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const inscritos = championships.filter((c) => c.registered);
  const noInscritos = championships.filter((c) => !c.registered);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inscritos.filter((c) => c.name.toLowerCase().includes(q));
  }, [search, inscritos]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  if (selectedChampionshipId) {
    return (
      <CampeonatoDetalle
        championshipId={selectedChampionshipId}
        registration={
          registrations.find(
            (r) => r.championshipId === selectedChampionshipId
          ) as ChampionshipRegistration
        }
        players={championshipPlayers.filter(
          (p) => p.championshipId === selectedChampionshipId
        )}
        onBack={() => setSelectedChampionshipId(null)}
      />
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold text-league-700">
        Torneos
      </h1>

      <button
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
        onClick={() =>
          setOpenSection((prev) => ({
            ...prev,
            inscritos: !prev.inscritos,
          }))
        }
      >
        Torneos Inscritos
        <span>{openSection.inscritos ? "▲" : "▼"}</span>
      </button>
      {openSection.inscritos && (
        <div className="rounded-xl border border-slate-200 bg-white/70 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-64">
              <Input
                placeholder="Buscar"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <ChampionshipsTableDesktop
              rows={paged}
              onView={setSelectedChampionshipId}
            />
          </div>
          <ChampionshipsCardsMobile
            rows={paged}
            onView={setSelectedChampionshipId}
          />

          <div className="flex items-center justify-between text-xs text-slate-500">
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
      )}

      <button
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
        onClick={() =>
          setOpenSection((prev) => ({
            ...prev,
            noInscritos: !prev.noInscritos,
          }))
        }
      >
        Torneos No Inscritos
        <span>{openSection.noInscritos ? "▲" : "▼"}</span>
      </button>
      {openSection.noInscritos && (
        <div className="rounded-xl border border-slate-200 bg-white/70 p-4 space-y-4">
          <div className="hidden md:block">
            <ChampionshipsTableDesktop rows={noInscritos} />
          </div>

          <ChampionshipsCardsMobile
            rows={noInscritos}
            onView={setSelectedChampionshipId}
          />
        </div>
      )}
    </section>
  );
};

export default CampeonatosPage;
