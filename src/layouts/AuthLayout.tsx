type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-league-soft text-slate-900">
      <div className="absolute inset-x-0 top-0 h-2 bg-league-sweep" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-league-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-league-500/15 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuthLayout;
