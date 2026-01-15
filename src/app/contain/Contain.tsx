import type { AppSection } from "../types/layout";
import Home from "../../pages/Home";

type Props = {
  activeSection: AppSection;
};

const Contain = ({ activeSection }: Props) => {
  switch (activeSection) {
    case "Inicio":
      return <Home />;
    default:
      return (
        <div className="text-sm text-slate-500">
          Seccion: {activeSection}
        </div>
      );
  }
};

export default Contain;
