import type { Tournament } from "../types";

type Props = {
  item: Tournament;
  onClick: () => void;
};

const TournamentCard = ({ item, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-center shadow-card-soft transition hover:-translate-y-0.5"
    >
      <div className="text-xs text-slate-500">{item.year}</div>
      <div className="mt-2 text-sm font-semibold text-slate-800">
        {item.title}
      </div>
      <div className="mt-1 text-xs text-slate-500">
        {item.category}
      </div>
    </button>
  );
};

export default TournamentCard;
