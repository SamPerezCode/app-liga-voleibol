import type { BracketMatch } from "../types";
import TeamAvatar from "./TeamAvatar";

type Props = {
  match: BracketMatch;
};

const BracketMatchCard = ({ match }: Props) => {
  const isChampion = match.stage === "champion";
  const hasBothTeams = Boolean(match.teamA && match.teamB);

  if (isChampion && !hasBothTeams) {
    return (
      <div className="w-full max-w-[360px] min-h-[140px] rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Campeon
        </div>
        <div className="mt-4 flex flex-col items-center gap-3">
          <TeamAvatar team={match.teamA} size="lg" />
          <div className="text-sm font-semibold text-slate-700">
            {match.teamA?.name ?? "No definido"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[360px] min-h-[150px] rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 items-center justify-center">
            <TeamAvatar team={match.teamA} size="lg" />
          </div>
          <span className="mt-2 min-h-[36px] text-xs font-semibold text-slate-700 leading-tight">
            {match.teamA?.name ?? "No definido"}
          </span>
        </div>

        <div className="flex h-16 items-center justify-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-slate-400">
            VS
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 items-center justify-center">
            <TeamAvatar team={match.teamB} size="lg" />
          </div>
          <span className="mt-2 min-h-[36px] text-xs font-semibold text-slate-700 leading-tight">
            {match.teamB?.name ?? "No definido"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BracketMatchCard;
