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

  const winnerA = scoreA > scoreB;
  const winnerB = scoreB > scoreA;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-card-soft">
      <div className="absolute inset-x-0 top-0 h-1 bg-league-sweep" />

      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <span>{match.phase}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
          {match.group}
        </span>
      </div>

      <div className="mt-4 grid gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <TeamAvatar team={match.teamA} size="sm" />
            <div>
              <div
                className={`text-sm font-semibold ${
                  winnerA ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {match.teamA.name}
              </div>
              <div className="text-[11px] text-slate-400">Local</div>
            </div>
          </div>
          <div className="rounded-full bg-slate-900 px-3 py-1 text-white text-base font-semibold">
            {scoreA}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] text-slate-400">
          VS
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <TeamAvatar team={match.teamB} size="sm" />
            <div>
              <div
                className={`text-sm font-semibold ${
                  winnerB ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {match.teamB.name}
              </div>
              <div className="text-[11px] text-slate-400">
                Visitante
              </div>
            </div>
          </div>
          <div className="rounded-full bg-slate-900 px-3 py-1 text-white text-base font-semibold">
            {scoreB}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center text-[10px] text-slate-500">
          {match.sets.map((s, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-100 px-2 py-0.5"
            >
              S{i + 1} {s.a}-{s.b}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{match.date}</span>
        <span>{match.time}</span>
      </div>
    </div>
  );
};

export default MatchResultCard;
