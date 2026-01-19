import { useState } from "react";

type Props = {
  onClick: () => void;
  ariaLabel?: string;
  title?: string;
  className?: string;
};

const ResetButton = ({
  onClick,
  ariaLabel = "Restablecer filtros",
  title = "Restablecer filtros",
  className = "",
}: Props) => {
  const [spinCount, setSpinCount] = useState(0);

  const handleClick = () => {
    onClick();
    setSpinCount((value) => value + 1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 ${className}`.trim()}
      aria-label={ariaLabel}
      title={title}
    >
      <img
        src="/refresh.svg"
        alt=""
        aria-hidden="true"
        className="h-5 w-5 opacity-90 filter brightness-75 contrast-125 transition-transform duration-500"
        style={{ transform: `rotate(${spinCount * 360}deg)` }}
      />
    </button>
  );
};

export default ResetButton;
