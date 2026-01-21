import { useMemo, useState } from "react";
import type {
  Championship,
  ChampionshipPlayer,
  ChampionshipStatus,
} from "../types";
import type { Club } from "../../clubes/types";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import StatusBadge from "../../../ui/StatusBadge";
import PlayersTable from "./PlayersTable";
import PlayerAvatar from "./PlayerAvatar";

type DetailProps = {
  championship: Championship;
  clubs: Club[];
  registeredClubIds: string[];
  players: ChampionshipPlayer[];
  onBack: () => void;
};

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

type ClubTab = "inscritos" | "no-inscritos";
type PlayerTab = "pre" | "ins";

const CampeonatoDetalle = ({
  championship,
  clubs,
  registeredClubIds,
  players,
  onBack,
}: DetailProps) => {
  const [clubTab, setClubTab] = useState<ClubTab>("inscritos");
  const [selectedClubId, setSelectedClubId] = useState<string | null>(
    null
  );
  const [playerTab, setPlayerTab] = useState<PlayerTab>("pre");

  const [assignPlayer, setAssignPlayer] =
    useState<ChampionshipPlayer | null>(null);
  const [cardPlayer, setCardPlayer] =
    useState<ChampionshipPlayer | null>(null);
  const [jerseyNumber, setJerseyNumber] = useState("");

  const registeredSet = useMemo(
    () => new Set(registeredClubIds),
    [registeredClubIds]
  );

  const registeredClubs = useMemo(
    () => clubs.filter((club) => registeredSet.has(club.id)),
    [clubs, registeredSet]
  );

  const notRegisteredClubs = useMemo(
    () => clubs.filter((club) => !registeredSet.has(club.id)),
    [clubs, registeredSet]
  );

  const clubRows =
    clubTab === "inscritos" ? registeredClubs : notRegisteredClubs;

  const handleSelectClub = (clubId: string) => {
    setSelectedClubId(clubId);
    setPlayerTab("pre");
  };

  const clubColumns: TableColumn<Club>[] = [
    {
      key: "nombre",
      label: "Club",
      className: "w-[30%]",
      render: (row) => (
        <div className="font-semibold text-slate-800">
          {row.nombre}
        </div>
      ),
    },
    {
      key: "municipio",
      label: "Municipio",
    },
    {
      key: "presidente",
      label: "Presidente",
    },
    {
      key: "telefono1",
      label: "Contacto",
    },
    {
      key: "id",
      label: "Ver",
      render: (row) => (
        <Button
          variant="info"
          size="sm"
          onClick={() => handleSelectClub(row.id)}
        >
          Ver
        </Button>
      ),
    },
  ];

  if (selectedClubId) {
    const club = clubs.find((row) => row.id === selectedClubId);
    if (!club) {
      return (
        <section className="space-y-4">
          <Button variant="outline" onClick={onBack}>
            Atras
          </Button>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
            No se encontro el club.
          </div>
        </section>
      );
    }

    const clubPlayers = players.filter(
      (p) =>
        p.championshipId === championship.id && p.club === club.nombre
    );
    const pre = clubPlayers.filter((p) => p.stage === "preinscrito");
    const ins = clubPlayers.filter((p) => p.stage === "inscrito");

    return (
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-league-700">
              {club.nombre}
            </h1>
            <p className="text-xs text-slate-500">
              Inscripciones del torneo {championship.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedClubId(null)}
            >
              Volver a clubes
            </Button>
            <Button variant="outline" onClick={onBack}>
              Atras
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Club
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {club.nombre}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {club.municipio} · {club.barrio}
              </div>
            </div>
            <StatusBadge
              label={statusLabel[championship.status]}
              tone={statusTone[championship.status]}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Presidente
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-800">
                {club.presidente}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Contacto
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-800">
                {club.telefono1}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Deportistas
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-800">
                {clubPlayers.length}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Navegacion
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {[
                    {
                      id: "pre",
                      label: "Deportistas Preinscritos",
                      count: pre.length,
                    },
                    {
                      id: "ins",
                      label: "Deportistas Inscritos",
                      count: ins.length,
                    },
                  ].map((item) => {
                    const active = playerTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setPlayerTab(item.id as PlayerTab)
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
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
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 space-y-4">
              {playerTab === "pre" && (
                <PlayersTable
                  rows={pre}
                  showActions={false}
                  onAssign={() => {}}
                  onView={() => {}}
                />
              )}

              {playerTab === "ins" && (
                <PlayersTable
                  rows={ins}
                  showActions
                  onAssign={(player) => setAssignPlayer(player)}
                  onView={(player) => setCardPlayer(player)}
                />
              )}
            </div>
          </div>
        </div>

        <Modal
          open={assignPlayer !== null}
          title="Asignar Numero de Camiseta"
          onClose={() => {
            setAssignPlayer(null);
            setJerseyNumber("");
          }}
        >
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <label className="text-xs text-slate-500">
                Deportista
              </label>
              <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                {assignPlayer?.fullName}
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500">
                Numero de Camiseta
              </label>
              <input
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAssignPlayer(null);
                  setJerseyNumber("");
                }}
              >
                Cerrar
              </Button>
              <Button>Asignar Numero</Button>
            </div>
          </div>
        </Modal>

        <Modal
          open={cardPlayer !== null}
          title={`Carnet ${cardPlayer?.documentNumber ?? ""}`}
          onClose={() => setCardPlayer(null)}
        >
          {cardPlayer && (
            <div className="flex justify-center">
              <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white shadow-card-soft">
                <div className="h-16 rounded-t-2xl bg-league-sweep" />
                <div className="-mt-10 flex justify-center">
                  <PlayerAvatar
                    name={cardPlayer.fullName}
                    photoUrl={cardPlayer.photoUrl}
                  />
                </div>
                <div className="px-6 pb-6 pt-4 text-center">
                  <div className="text-sm font-semibold text-slate-800">
                    {cardPlayer.fullName}
                  </div>
                  <div className="text-xs text-slate-500">
                    Deportista
                  </div>
                  <div className="mt-3 text-left text-xs text-slate-600 space-y-1">
                    <div>
                      <strong>Liga:</strong> Liga de Voleibol del
                      Cesar
                    </div>
                    <div>
                      <strong>Club:</strong> {cardPlayer.club}
                    </div>
                    <div>
                      <strong>Categoria:</strong>{" "}
                      {cardPlayer.category}
                    </div>
                    <div>
                      <strong>Fecha de nacimiento:</strong>{" "}
                      {cardPlayer.birthDate}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">
                      QR
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500">
                    FCV-{cardPlayer.documentNumber}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-league-700">
            {championship.name}
          </h1>
          <p className="text-xs text-slate-500">
            Clubes inscritos y no inscritos en este torneo.
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Torneo
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {championship.name}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {championship.category} · {championship.city}
            </div>
          </div>
          <StatusBadge
            label={statusLabel[championship.status]}
            tone={statusTone[championship.status]}
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Fechas
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {championship.startDate} / {championship.endDate}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Clubes inscritos
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {registeredClubs.length}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Clubes no inscritos
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-800">
              {notRegisteredClubs.length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Estados
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {[
                  {
                    id: "inscritos",
                    label: "Clubes inscritos",
                    count: registeredClubs.length,
                  },
                  {
                    id: "no-inscritos",
                    label: "Clubes no inscritos",
                    count: notRegisteredClubs.length,
                  },
                ].map((item) => {
                  const active = clubTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setClubTab(item.id as ClubTab)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
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
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-card-soft">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 space-y-4">
            <div className="hidden md:block">
              <Table
                columns={clubColumns}
                data={clubRows}
                emptyMessage="No hay clubes para este estado"
              />
            </div>

            <div className="md:hidden space-y-3">
              {clubRows.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-xs text-slate-500">
                  No hay clubes para este estado
                </div>
              ) : (
                clubRows.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-card-soft"
                  >
                    <div className="text-sm font-semibold text-slate-800">
                      {row.nombre}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {row.municipio} · {row.presidente}
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleSelectClub(row.id)}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampeonatoDetalle;
