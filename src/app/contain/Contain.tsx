import type { AppSection } from "../types/layout";
import Home from "../../pages/Home";
import SolicitudesPage from "../../features/solicitudes/pages/SolicitudesPage";
import ClubesPage from "../../features/clubes/components/ClubesPage";
import DeportistasPage from "../../features/deportistas/pages/DeportistasPage";

type Props = {
  activeSection: AppSection;
};

const Contain = ({ activeSection }: Props) => {
  switch (activeSection) {
    case "Inicio":
      return <Home />;
    case "Solicitudes":
      return <SolicitudesPage />;
    case "Clubes":
      return <ClubesPage />;
    case "Deportistas":
      return <DeportistasPage />;
    case "Entrenadores":
    case "Campeonatos":
    case "Partidos":
    case "Documentos":
    case "Pagos":
    case "Perfil":
    default:
      return (
        <div className="text-sm text-slate-500">
          Seccion: {activeSection}
        </div>
      );
  }
};

export default Contain;
