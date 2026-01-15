import { useState } from "react";

type Props = {
  name: string;
  photoUrl?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "h-10 w-10 text-[10px]",
  md: "h-12 w-12 text-xs",
  lg: "h-24 w-24 text-base",
};

const AthleteAvatar = ({ name, photoUrl, size = "md" }: Props) => {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const showImage = photoUrl && !error;

  if (showImage) {
    return (
      <img
        src={photoUrl}
        alt={name}
        onError={() => setError(true)}
        className={`${sizeStyles[size]} rounded-xl object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeStyles[size]} flex items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-500`}
    >
      {initials}
    </div>
  );
};

export default AthleteAvatar;
