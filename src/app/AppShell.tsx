import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import Footer from "../components/footer/Footer";
import Contain from "./contain/Contain";
import type { AppSection } from "./types/layout";
import { users } from "./mocks/users";

const AppShell = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<AppSection>("Inicio");

  const storedId =
    typeof window !== "undefined"
      ? localStorage.getItem("auth:userId")
      : null;

  const storedRole =
    typeof window !== "undefined"
      ? (localStorage.getItem("auth:role") as
          | "admin"
          | "liga"
          | "club"
          | "deportista"
          | "entrenador"
          | "arbitro"
          | null)
      : null;

  const baseUser =
    users.find((u) => u.id === storedId) ??
    users.find((u) => u.role === "admin")!;

  const resolvedRole =
    storedRole && baseUser.roles?.includes(storedRole)
      ? storedRole
      : baseUser.role;

  const currentUser = { ...baseUser, role: resolvedRole };

  const handleProfile = () => setActiveSection("Perfil");

  const handleLogout = () => {
    localStorage.removeItem("auth:userId");
    localStorage.removeItem("auth:role");

    window.location.assign("/login");
  };

  return (
    <div className="min-h-screen bg-league-soft text-slate-900">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        activeItem={activeSection}
        onSelect={setActiveSection}
      />

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeItem={activeSection}
        onSelect={(item) => {
          setActiveSection(item as AppSection);
          setMobileOpen(false);
        }}
      />

      <div
        className={`min-h-screen ${
          sidebarOpen ? "lg:pl-72" : "lg:pl-16"
        } flex flex-col`}
      >
        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Header
              onMenuClick={() => setMobileOpen(true)}
              user={currentUser}
              sectionTitle={activeSection}
              onProfile={handleProfile}
              onLogout={handleLogout}
            />
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-card-soft">
              <Contain
                activeSection={activeSection}
                onNavigate={setActiveSection}
              />
            </div>
          </div>
        </main>

        <div className="px-4 pb-6 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppShell;
