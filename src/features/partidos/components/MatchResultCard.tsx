import type { MatchResult } from "../types";
import TeamAvatar from "./TeamAvatar";

type Props = {
  match: MatchResult;
};

const MatchResultCard = ({ match }: Props) => {
  const setsA = match.sets.map((s) => s.a);
  const setsB = match.sets.map((s) => s.b);
  const scoreA = setsA.filter((s, i) => s > setsB[i]).length;
  const scoreB = setsB.filter((s, i) => s > setsA[i]).length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card-soft">
      <div className="text-xs text-slate-500 text-center">
        {match.phase}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <TeamAvatar team={match.teamA} />
          <span className="text-xs text-slate-600">
            {match.teamA.name}
          </span>
        </div>

        <div className="text-center">
          <div className="text-2xl font-semibold text-slate-800">
            {scoreA} - {scoreB}
          </div>
          <div className="mt-1 text-[10px] text-slate-500">
            {match.sets.map((s, i) => (
              <div key={i}>
                {s.a} - {s.b}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <TeamAvatar team={match.teamB} />
          <span className="text-xs text-slate-600">
            {match.teamB.name}
          </span>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-slate-500">
        {match.date} | {match.time} | {match.group}
      </div>
    </div>
  );
};

export default MatchResultCard;
