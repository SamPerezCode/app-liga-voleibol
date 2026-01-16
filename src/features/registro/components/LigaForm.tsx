import type { RefObject } from "react";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";

type Props = {
  formRef: RefObject<HTMLFormElement | null>;
};

const fileClass =
  "file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-600";

const LigaForm = ({ formRef }: Props) => {
  return (
    <form ref={formRef} className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          Registro de Ligas
        </h3>
        <p className="text-xs text-slate-500">
          Completa la informacion administrativa de la liga.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs text-slate-500">Logo</label>
          <Input type="file" className={fileClass} />
        </div>
        <div>
          <label className="text-xs text-slate-500">Nombre</label>
          <Input placeholder="Liga de Voleibol del Cesar" />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Departamento
          </label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option>CESAR</option>
            <option>MAGDALENA</option>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Municipio</label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opcion
            </option>
            <option>Valledupar</option>
            <option>Aguachica</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Barrio / Conjunto
          </label>
          <Input placeholder="Fundadores" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Direccion</label>
          <Input placeholder="Transversal 23 No 16 B 36" />
        </div>

        <div>
          <label className="text-xs text-slate-500">Telefono 1</label>
          <Input placeholder="3185575304" />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Telefono 2 (Opcional)
          </label>
          <Input placeholder="3025135818" />
        </div>

        <div>
          <label className="text-xs text-slate-500">Presidente</label>
          <Input placeholder="Nombre del presidente" />
        </div>
        <div>
          <label className="text-xs text-slate-500">Secretario</label>
          <Input placeholder="Nombre del secretario" />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Vicepresidente (Opcional)
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Tesorero (Opcional)
          </label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Vocal (Opcional)
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Correo Electronico
          </label>
          <Input placeholder="contacto@voleicesar.com" />
        </div>

        <div>
          <label className="text-xs text-slate-500">Contrasena</label>
          <Input type="password" placeholder="********" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-4">
        <div className="text-sm font-semibold text-slate-700">
          Documentos
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-slate-500">
              Reconocimiento deportivo (PDF)
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Fecha de inicio
            </label>
            <Input type="date" />
          </div>

          <div>
            <label className="text-xs text-slate-500">
              Personeria juridica (PDF)
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Fecha de inicio
            </label>
            <Input type="date" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-500">
              Numero de resolucion o categoria
            </label>
            <Input placeholder="Ej. 1234567890 o Categoria A" />
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

export default LigaForm;
