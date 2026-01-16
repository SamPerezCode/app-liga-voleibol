import type { RefObject } from "react";
import { municipiosCesar } from "../../../app/mocks/cesarMunicipios";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";

type Props = {
  formRef: RefObject<HTMLFormElement | null>;
};

const fileClass =
  "file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-600";

const EntrenadorForm = ({ formRef }: Props) => {
  return (
    <form ref={formRef} className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          Registro de Entrenadores
        </h3>
        <p className="text-xs text-slate-500">
          Completa los datos del entrenador y sus documentos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs text-slate-500">Foto</label>
          <Input type="file" className={fileClass} />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Nombre completo
          </label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">Municipio</label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            {municipiosCesar.map((mun) => (
              <option key={mun}>{mun}</option>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Barrio / Conjunto
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">Direccion</label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">Liga</label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option>Liga de Voleibol del Cesar</option>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Club</label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option>Club Deportivo Alpha Voley</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">Telefono</label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Tipo de documento
          </label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option>CC</option>
            <option>TI</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Numero de documento
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Correo electronico
          </label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">Contrasena</label>
          <Input type="password" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-4">
        <div className="text-sm font-semibold text-slate-700">
          Documentos
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-slate-500">
              Documento identidad
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Carnet entrenador
            </label>
            <Input type="file" className={fileClass} />
          </div>

          <div>
            <label className="text-xs text-slate-500">
              Resolucion / categoria
            </label>
            <Input />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Hoja de vida
            </label>
            <Input type="file" className={fileClass} />
          </div>

          <div>
            <label className="text-xs text-slate-500">
              Certificado curso nacional (Opcional)
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Resolucion / categoria
            </label>
            <Input />
          </div>

          <div>
            <label className="text-xs text-slate-500">
              Certificado FIVB (Opcional)
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Resolucion / categoria
            </label>
            <Input />
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-slate-500">
        <input type="checkbox" className="h-4 w-4" />
        Acepto los terminos y condiciones
      </label>

      <div className="flex justify-end">
        <Button type="submit">Registrarse</Button>
      </div>
    </form>
  );
};

export default EntrenadorForm;
