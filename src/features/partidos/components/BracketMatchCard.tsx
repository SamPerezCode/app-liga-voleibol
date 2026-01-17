import type { BracketMatch } from "../types";
import TeamAvatar from "./TeamAvatar";

type Props = {
  match: BracketMatch;
};

const BracketMatchCard = ({ match }: Props) => {
  const isChampion = match.stage === "champion";

  if (isChampion) {
    return (
      <div className="relative w-full max-w-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-card-soft text-center">
        <div className="absolute inset-x-0 top-0 h-1 bg-league-sweep" />
        <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          Campeon
        </div>
        <div className="mt-4 flex flex-col items-center gap-3">
          <TeamAvatar team={match.teamA} size="lg" />
          <div className="text-sm font-semibold text-slate-800">
            {match.teamA?.name ?? "No definido"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-card-soft">
      <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-league-400/10 blur-2xl" />

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <TeamAvatar team={match.teamA} size="sm" />
            <span className="text-xs font-semibold text-slate-700">
              {match.teamA?.name ?? "No definido"}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            A
          </span>
        </div>

        <div className="flex items-center justify-center text-[10px] uppercase tracking-[0.4em] text-slate-400">
          VS
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <TeamAvatar team={match.teamB} size="sm" />
            <span className="text-xs font-semibold text-slate-700">
              {match.teamB?.name ?? "No definido"}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
            B
          </span>
        </div>
      </div>
    </div>
  );
};

export default BracketMatchCard;
