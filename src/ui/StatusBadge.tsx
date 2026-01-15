type StatusTone = "approved" | "pending" | "paid" | "unpaid" | "info";

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
  className?: string;
};

const toneStyles: Record<StatusTone, string> = {
  approved: "bg-league-100 text-league-800 ring-league-200",
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  paid: "bg-sky-100 text-sky-800 ring-sky-200",
  unpaid: "bg-rose-100 text-rose-700 ring-rose-200",
  info: "bg-slate-100 text-slate-700 ring-slate-200",
};

const StatusBadge = ({
  label,
  tone,
  className = "",
}: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneStyles[tone]} ${className}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
