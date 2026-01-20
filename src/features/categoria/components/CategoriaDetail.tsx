import { useMemo, useState } from "react";
import type { Categoria } from "../type/types";
import type { Athlete } from "../../../app/types/athletes";
import type { Coach } from "../../../app/types/coaches";
import Button from "../../../ui/Button";
import Pagination from "../../../ui/Pagination";

import AthleteDetail from "../../deportistas/components/AthleteDetail";
import CoachDetail from "../../entrenadores/components/CoachDetail";
import AthletesTableDesktop from "../../deportistas/components/AthletesTableDesktop";
import AthletesCardsMobile from "../../deportistas/components/AthletesCardsMobile";
import CoachesTableDesktop from "../../entrenadores/components/CoachesTableDesktop";
import CoachesCardsMobile from "../../entrenadores/components/CoachesCardsMobile";

type Props = {
  categoria: Categoria;
  athletes: Athlete[];
  coaches: Coach[];
  onBack: () => void;
};

type DetailTab = "athletes" | "coaches";

const statusStyles: Record<Categoria["status"], string> = {
  activa: "bg-emerald-100 text-emerald-700",
  inactiva: "bg-slate-100 text-slate-600",
};

const formatRangeLabel = (item: Categoria) =>
  item.edadMax >= 99
    ? `Edad ${item.edadMin}+`
    : `Edad ${item.edadMin} - ${item.edadMax}`;

const CategoriaDetail = ({
  categoria,
  athletes,
  coaches,
  onBack,
}: Props) => {
  const [tab, setTab] = useState<DetailTab>("athletes");
  const [athletePage, setAthletePage] = useState(1);
  const [coachPage, setCoachPage] = useState(1);
  const [selectedAthleteId, setSelectedAthleteId] = useState<
    string | null
  >(null);
  const [selectedCoachId, setSelectedCoachId] = useState<
    string | null
  >(null);

  const pageSize = 6;

  const pagedAthletes = useMemo(() => {
    const start = (athletePage - 1) * pageSize;
    return athletes.slice(start, start + pageSize);
  }, [athletes, athletePage, pageSize]);

  const pagedCoaches = useMemo(() => {
    const start = (coachPage - 1) * pageSize;
    return coaches.slice(start, start + pageSize);
  }, [coaches, coachPage, pageSize]);

  const selectedAthlete = selectedAthleteId
    ? athletes.find((a) => a.id === selectedAthleteId)
    : null;

  if (selectedAthlete) {
    return (
      <AthleteDetail
        athlete={selectedAthlete}
        onBack={() => setSelectedAthleteId(null)}
      />
    );
  }

  const selectedCoach = selectedCoachId
    ? coaches.find((c) => c.id === selectedCoachId)
    : null;

  if (selectedCoach) {
    return (
      <CoachDetail
        coach={selectedCoach}
        onBack={() => setSelectedCoachId(null)}
      />
    );
  }

  const rangeLabel = formatRangeLabel(categoria);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Categoria
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-card-soft">
        <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-league-400/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-40 w-40 rounded-full bg-emerald-200/25 blur-3xl" />

        <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Categoria
            </div>
            <div className="mt-2 text-lg font-semibold text-slate-800">
              {categoria.nombre}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {rangeLabel}
            </div>

            <span
              className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[categoria.status]}`}
            >
              {categoria.status === "activa" ? "Activa" : "Inactiva"}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Edad minima
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-800">
                {categoria.edadMin}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Edad maxima
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-800">
                {categoria.edadMax}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Deportistas
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-800">
                {athletes.length}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Entrenadores
              </div>
              <div className="mt-2 text-lg font-semibold text-slate-800">
                {coaches.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Navegacion
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {[
                {
                  id: "athletes",
                  label: "Deportistas",
                  count: athletes.length,
                },
                {
                  id: "coaches",
                  label: "Entrenadores",
                  count: coaches.length,
                },
              ].map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id as DetailTab)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-league-700 text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 space-y-4">
            {tab === "athletes" && (
              <>
                <div className="hidden md:block">
                  <AthletesTableDesktop
                    rows={pagedAthletes}
                    onView={setSelectedAthleteId}
                  />
                </div>
                <AthletesCardsMobile
                  rows={pagedAthletes}
                  onView={setSelectedAthleteId}
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Mostrando {pagedAthletes.length} de{" "}
                    {athletes.length}
                  </span>

                  {athletes.length > pageSize && (
                    <Pagination
                      page={athletePage}
                      pageSize={pageSize}
                      total={athletes.length}
                      onPageChange={setAthletePage}
                    />
                  )}
                </div>
              </>
            )}

            {tab === "coaches" && (
              <>
                <div className="hidden md:block">
                  <CoachesTableDesktop
                    rows={pagedCoaches}
                    onView={setSelectedCoachId}
                  />
                </div>
                <CoachesCardsMobile
                  rows={pagedCoaches}
                  onView={setSelectedCoachId}
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Mostrando {pagedCoaches.length} de{" "}
                    {coaches.length}
                  </span>

                  {coaches.length > pageSize && (
                    <Pagination
                      page={coachPage}
                      pageSize={pageSize}
                      total={coaches.length}
                      onPageChange={setCoachPage}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriaDetail;
