import { useState } from "react";

type PersonAvatarProps = {
  name: string;
  photoUrl?: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeStyles = {
  sm: "h-10 w-10 text-[10px]",
  md: "h-12 w-12 text-xs",
};

const PersonAvatar = ({
  name,
  photoUrl,
  size = "md",
  className = "",
}: PersonAvatarProps) => {
  const [error, setError] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const shouldShowImage = photoUrl && !error;

  if (shouldShowImage) {
    return (
      <img
        src={photoUrl}
        alt={name}
        onError={() => setError(true)}
        className={`${sizeStyles[size]} rounded-xl object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeStyles[size]} flex items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-500 ${className}`}
    >
      {initials}
    </div>
  );
};

export default PersonAvatar;
