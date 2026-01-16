import type { AppSection } from "../types/layout";
import Home from "../../pages/Home";
import SolicitudesPage from "../../features/solicitudes/pages/SolicitudesPage";
import DeportistasPage from "../../features/deportistas/pages/DeportistasPage";
import EntrenadoresPage from "../../features/entrenadores/pages/EntrenadoresPage";
import CampeonatosPage from "../../features/campeonatos/pages/CampeonatosPage";
import PartidosPage from "../../features/partidos/pages/PartidosPage";
import DocumentosPage from "../../features/documentos/pages/DocumentosPage";
import ClubesPage from "../../features/clubes/pages/ClubesPage";
import PagosPage from "../../features/pagos/pages/PagosPage";
import PerfilPage from "../../features/perfil/pages/PerfilPage";

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
      return <EntrenadoresPage />;
    case "Campeonatos":
      return <CampeonatosPage />;
    case "Partidos":
      return <PartidosPage />;
    case "Documentos":
      return <DocumentosPage />;
    case "Pagos":
      return <PagosPage />;
    case "Perfil":
      return <PerfilPage />;
    default:
      return (
        <div className="text-sm text-slate-500">
          Seccion: {activeSection}
        </div>
      );
  }
};

export default Contain;
