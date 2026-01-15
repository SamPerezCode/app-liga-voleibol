import { useState } from "react";

type Props = {
  name: string;
  photoUrl?: string;
};

const PlayerAvatar = ({ name, photoUrl }: Props) => {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  if (photoUrl && !error) {
    return (
      <img
        src={photoUrl}
        alt={name}
        onError={() => setError(true)}
        className="h-12 w-12 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500">
      {initials}
    </div>
  );
};

export default PlayerAvatar;
