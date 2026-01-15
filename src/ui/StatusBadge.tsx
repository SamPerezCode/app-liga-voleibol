type StatusTone = "approved" | "pending" | "paid" | "unpaid" | "info";

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
  className?: string;
};

const toneStyles: Record<StatusTone, string> = {
  approved:
    "bg-gradient-to-r from-league-600/15 to-league-400/15 text-league-800 ring-league-300/40",
  pending:
    "bg-gradient-to-r from-amber-500/15 to-orange-400/15 text-amber-800 ring-amber-300/40",
  paid: "bg-gradient-to-r from-sky-500/15 to-cyan-400/15 text-sky-800 ring-sky-300/40",
  unpaid:
    "bg-gradient-to-r from-rose-500/15 to-pink-400/15 text-rose-700 ring-rose-300/40",
  info: "bg-gradient-to-r from-slate-500/10 to-slate-400/10 text-slate-700 ring-slate-200/50",
};

const StatusBadge = ({
  label,
  tone,
  className = "",
}: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${toneStyles[tone]} ${className}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
