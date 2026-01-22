import { useState } from "react";
import Modal from "./Modal";

const terms = [
  "Al registrarme en la Liga de Voleibol del Cesar, declaro que la información suministrada es veraz y autorizo, de manera libre, previa, expresa e informada, el tratamiento de mis datos personales, conforme a lo establecido en la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas que regulan el Habeas Data en Colombia.",
  "Autorizo que mis datos sean recolectados, almacenados, usados, actualizados y tratados por la Liga de Voleibol del Cesar con fines administrativos, deportivos, estadísticos, de comunicación, organización de torneos, control de participantes y demás actividades propias del objeto de la Liga.",
  "Entiendo que mis datos podrán ser utilizados para la gestión de inscripciones, programación de competencias, difusión de resultados y comunicaciones informativas y promocionales relacionadas exclusivamente con la actividad deportiva.",
  "Declaro conocer que, como titular de los datos, tengo derecho a conocer, actualizar, rectificar y solicitar la supresión de mis datos, así como a revocar esta autorización en los términos establecidos por la ley.",
  "Asimismo, acepto cumplir los reglamentos deportivos, las normas disciplinarias y las condiciones de participación definidas por la Liga de Voleibol del Cesar para torneos, eventos y actividades oficiales.",
  "He leído y acepto los términos y condiciones aquí descritos.",
];

const TermsAndConditions = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-start gap-2 text-xs text-slate-500">
      <input type="checkbox" className="mt-0.5 h-4 w-4" required />
      <div>
        <span>
          Acepto los términos y condiciones y autorizo el tratamiento
          de mis datos.
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-1 font-semibold text-league-700 underline hover:text-league-800"
        >
          Leer términos y condiciones
        </button>
      </div>

      <Modal
        open={open}
        title="Términos y condiciones"
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3 text-sm text-slate-600">
          {terms.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TermsAndConditions;
