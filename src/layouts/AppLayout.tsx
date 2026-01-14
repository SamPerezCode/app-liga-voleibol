import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-league-soft text-slate-900">
      <Header onMenuClick={() => setMobileOpen(true)} />
      <Sidebar />
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="pt-16 lg:pl-72">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
