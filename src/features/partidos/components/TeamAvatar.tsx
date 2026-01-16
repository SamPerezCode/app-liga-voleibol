import { useState } from "react";
import type { Team } from "../types";

type Props = {
  team: Team | null;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const TeamAvatar = ({ team, size = "md" }: Props) => {
  const [error, setError] = useState(false);
  const sizeClass = sizeMap[size];

  if (!team) {
    return (
      <div
        className={`flex ${sizeClass} items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400`}
      >
        --
      </div>
    );
  }

  const initials = team.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((t) => t[0])
    .join("")
    .toUpperCase();

  if (team.logoUrl && !error) {
    return (
      <img
        src={team.logoUrl}
        alt={team.name}
        onError={() => setError(true)}
        className={`${sizeClass} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${sizeClass} items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500`}
    >
      {initials}
    </div>
  );
};

export default TeamAvatar;
