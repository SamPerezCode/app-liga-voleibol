import { useState } from "react";
import type {
  ChampionshipPlayer,
  ChampionshipRegistration,
} from "../types";
import { championships } from "../mocks";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import PlayersTable from "./PlayersTable";
import PlayerAvatar from "./PlayerAvatar";

type DetailProps = {
  championshipId: string;
  registration?: ChampionshipRegistration;
  players: ChampionshipPlayer[];
  onBack: () => void;
};

const CampeonatoDetalle = ({
  championshipId,
  registration,
  players,
  onBack,
}: DetailProps) => {
  const [openSection, setOpenSection] = useState({
    pre: true,
    ins: true,
  });
  const [assignPlayer, setAssignPlayer] =
    useState<ChampionshipPlayer | null>(null);
  const [cardPlayer, setCardPlayer] =
    useState<ChampionshipPlayer | null>(null);
  const [jerseyNumber, setJerseyNumber] = useState("");

  const championship = championships.find(
    (c) => c.id === championshipId
  );

  if (!championship) {
    return (
      <section className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
          No se encontro el campeonato.
        </div>
      </section>
    );
  }
  const pre = players.filter((p) => p.stage === "preinscrito");
  const ins = players.filter((p) => p.stage === "inscrito");

  if (!registration) {
    return (
      <section className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
        <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
          Este campeonato aun no tiene inscripcion registrada.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-league-700">
          Inscripcion N. {registration.id.replace("reg-", "")}
        </h1>
        <Button variant="outline" onClick={onBack}>
          Atras
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
        <h2 className="text-sm font-semibold text-slate-700">
          Detalle Inscripcion
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
          <div>
            <strong>Presidente:</strong> {registration.president}
          </div>
          <div>
            <strong>Secretario:</strong> {registration.secretary}
          </div>
          <div>
            <strong>Delegado:</strong> {registration.delegate}
          </div>
          <div>
            <strong>Entrenador:</strong> {registration.coach}
          </div>
          <div>
            <strong>Asistente Tecnico:</strong>{" "}
            {registration.assistantCoach}
          </div>
          <div>
            <strong>Medico:</strong> {registration.doctor}
          </div>
          <div>
            <strong>Preparador Fisico:</strong>{" "}
            {registration.physicalTrainer}
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-semibold text-slate-700">
            Detalle Campeonato
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm text-slate-700">
            <div>
              <strong>Nombre:</strong> {championship.name}
            </div>
            <div>
              <strong>Categoria:</strong> {championship.category}
            </div>
            <div>
              <strong>Municipio:</strong> {championship.city}
            </div>
            <div>
              <strong>Fecha inicio:</strong> {championship.startDate}
            </div>
            <div>
              <strong>Fecha fin:</strong> {championship.endDate}
            </div>
          </div>
        </div>
      </div>

      <button
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
        onClick={() => setOpenSection((p) => ({ ...p, pre: !p.pre }))}
      >
        Deportistas Preinscritos
        <span>{openSection.pre ? "▲" : "▼"}</span>
      </button>
      {openSection.pre && (
        <PlayersTable
          rows={pre}
          showActions={false}
          onAssign={() => {}}
          onView={() => {}}
        />
      )}

      <button
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700"
        onClick={() => setOpenSection((p) => ({ ...p, ins: !p.ins }))}
      >
        Deportistas Inscritos
        <span>{openSection.ins ? "▲" : "▼"}</span>
      </button>
      {openSection.ins && (
        <PlayersTable
          rows={ins}
          showActions
          onAssign={(player) => setAssignPlayer(player)}
          onView={(player) => setCardPlayer(player)}
        />
      )}

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
              <div className="h-16 rounded-t-2xl bg-gradient-to-r from-amber-400 via-blue-500 to-red-500" />
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
                    <strong>Liga:</strong> Liga de Voleibol del Cesar
                  </div>
                  <div>
                    <strong>Club:</strong> {cardPlayer.club}
                  </div>
                  <div>
                    <strong>Categoria:</strong> {cardPlayer.category}
                  </div>
                  <div>
                    <strong>Fecha de nacimiento:</strong>{" "}
                    {cardPlayer.birthDate}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="h-20 w-20 rounded-lg bg-slate-100 text-[10px] text-slate-400 flex items-center justify-center">
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
};

export default CampeonatoDetalle;
