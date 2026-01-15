import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import StatusBadge from "../../../ui/StatusBadge";
import PlayerAvatar from "./PlayerAvatar";
import PlayersCardsMobile from "./PlayersCardsMobile";
import type { ChampionshipPlayer } from "../types";

type PlayersTableProps = {
  rows: ChampionshipPlayer[];
  showActions: boolean;
  onAssign: (player: ChampionshipPlayer) => void;
  onView: (player: ChampionshipPlayer) => void;
};

const PlayersTable = ({
  rows,
  showActions,
  onAssign,
  onView,
}: PlayersTableProps) => {
  const columns: TableColumn<ChampionshipPlayer>[] = [
    {
      key: "fullName",
      label: "Nombre",
      render: (row) => (
        <div className="flex items-center gap-2">
          <PlayerAvatar name={row.fullName} photoUrl={row.photoUrl} />
          <span>{row.fullName}</span>
        </div>
      ),
    },
    { key: "documentNumber", label: "Numero de Documento" },
    { key: "birthDate", label: "Fecha de Nacimiento" },
    { key: "club", label: "Club" },
    { key: "category", label: "Categoria" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusBadge
          label={row.status === "aprobado" ? "Aprobado" : "Pendiente"}
          tone={row.status === "aprobado" ? "approved" : "pending"}
        />
      ),
    },
  ];

  if (showActions) {
    columns.push({
      key: "id",
      label: "Acciones",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            onClick={() => onAssign(row)}
            title="Asignar numero de camiseta"
            aria-label="Asignar numero de camiseta"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M8 3l4 3 4-3 4 3-3 5v9H7V11L4 6l4-3z" />
            </svg>
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            onClick={() => onView(row)}
            title="Ver carnet"
            aria-label="Ver carnet"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect x="4" y="6" width="16" height="12" rx="2" />
              <circle cx="9" cy="12" r="2" />
              <path d="M13 10h5M13 14h5" />
            </svg>
          </button>
        </div>
      ),
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white/70 p-4 space-y-4">
      <div className="hidden md:block">
        <Table columns={columns} data={rows} />
      </div>
      <PlayersCardsMobile
        rows={rows}
        showActions={showActions}
        onAssign={onAssign}
        onView={onView}
      />
    </div>
  );
};

export default PlayersTable;
