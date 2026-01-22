import { useState, type RefObject } from "react";
import { municipiosCesar } from "../../../app/mocks/cesarMunicipios";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";
import TermsAndConditions from "../../../ui/TermsAndConditions";

type Props = {
  formRef: RefObject<HTMLFormElement | null>;
};

const fileClass =
  "file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-600";

const departmentOptions = [
  "Antioquia",
  "Arauca",
  "Atlántico",
  "Bolívar",
  "Boyacá",
  "Caldas",
  "Caquetá",
  "Casanare",
  "Cauca",
  "Cesar",
  "Chocó",
  "Córdoba",
  "Cundinamarca",
  "Guainía",
  "Guaviare",
  "Huila",
  "La Guajira",
  "Magdalena",
  "Meta",
  "Nariño",
  "Norte de Santander",
  "Putumayo",
  "Quindío",
  "Risaralda",
  "San Andrés y Providencia",
  "Santander",
  "Sucre",
  "Tolima",
  "Valle del Cauca",
  "Vaupés",
  "Vichada",
];

const countryOptions = [
  "Venezuela",
  "Ecuador",
  "Perú",
  "Brasil",
  "México",
  "Estados Unidos",
  "España",
  "Chile",
  "Argentina",
];

const documentOptions = [
  "Cédula de ciudadanía",
  "Tarjeta de identidad",
  "Pasaporte",
  "Permiso especial de permanencia (PEP)",
];

const EntrenadorForm = ({ formRef }: Props) => {
  const [nationality, setNationality] = useState("colombiano");
  const [residenceDepartment, setResidenceDepartment] =
    useState("Cesar");

  const isForeign = nationality === "extranjero";
  const residenceInCesar = residenceDepartment === "Cesar";

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
          <label className="text-xs text-slate-500">
            Nacionalidad
          </label>
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <option value="colombiano">Colombiano</option>
            <option value="extranjero">Extranjero</option>
          </Select>
        </div>
        {isForeign ? (
          <div>
            <label className="text-xs text-slate-500">
              País de nacionalidad
            </label>
            <Select defaultValue="">
              <option value="" disabled>
                Seleccione una opción
              </option>
              {countryOptions.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </Select>
          </div>
        ) : (
          <div>
            <label className="text-xs text-slate-500">
              Departamento de residencia
            </label>
            <Select
              value={residenceDepartment}
              onChange={(e) => setResidenceDepartment(e.target.value)}
              className="max-h-56 overflow-y-auto"
            >
              {departmentOptions.map((dep) => (
                <option key={dep}>{dep}</option>
              ))}
            </Select>
          </div>
        )}

        <div>
          <label className="text-xs text-slate-500">
            Departamento de residencia
          </label>
          <Select
            value={residenceDepartment}
            onChange={(e) => setResidenceDepartment(e.target.value)}
            className="max-h-56 overflow-y-auto"
          >
            {departmentOptions.map((dep) => (
              <option key={dep}>{dep}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Municipio de residencia
          </label>
          {residenceInCesar ? (
            <Select defaultValue="">
              <option value="" disabled>
                Seleccione una opción
              </option>
              {municipiosCesar.map((mun) => (
                <option key={mun}>{mun}</option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Municipio de residencia" />
          )}
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Barrio / Conjunto
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">Dirección</label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">Club</label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Club Deportivo Alpha Voley</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">Teléfono</label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Tipo de documento
          </label>
          <Select defaultValue="">
            <option value="" disabled>
              Seleccione una opción
            </option>
            {documentOptions.map((doc) => (
              <option key={doc}>{doc}</option>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Número de documento
          </label>
          <Input />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Correo electrónico
          </label>
          <Input />
        </div>

        <div>
          <label className="text-xs text-slate-500">Contraseña</label>
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
              Hoja de vida (Opcional)
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
              Certificado FIVB (Opcional)
            </label>
            <Input type="file" className={fileClass} />
          </div>
        </div>
      </div>

      <TermsAndConditions />

      <div className="flex justify-end">
        <Button type="submit">Registrarse</Button>
      </div>
    </form>
  );
};

export default EntrenadorForm;
