import { useState, type RefObject } from "react";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Button from "../../../ui/Button";
import TermsAndConditions from "../../../ui/TermsAndConditions";
import Modal from "../../../ui/Modal";

type Props = {
  formRef: RefObject<HTMLFormElement | null>;
};
type SubmitStatus = "idle" | "sending" | "success";

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

const ArbitroForm = ({ formRef }: Props) => {
  const [nationality, setNationality] = useState("colombiano");
  const [residenceDepartment, setResidenceDepartment] =
    useState("Cesar");
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const resetForm = () => {
    formRef.current?.reset();
  };

  const closeModal = () => {
    setSubmitStatus("idle");
    resetForm();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitStatus("sending");
    window.setTimeout(() => {
      setSubmitStatus("success");
    }, 1300);
  };

  const isForeign = nationality === "extranjero";
  const residenceInCesar = residenceDepartment === "Cesar";

  return (
    <form ref={formRef} className="space-y-6" onClick={handleSubmit}>
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          Registro de Árbitros
        </h3>
        <p className="text-xs text-slate-500">
          Completa los datos del árbitro y sus documentos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs text-slate-500">Foto</label>
          <Input type="file" className={fileClass} required />
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Nombre completo
          </label>
          <Input required />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Nacionalidad
          </label>
          <Select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
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
            <Select defaultValue="" required>
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
              required
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
            required
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
            <Select defaultValue="" required>
              <option value="" disabled>
                Seleccione una opción
              </option>
            </Select>
          ) : (
            <Input placeholder="Municipio de residencia" required />
          )}
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Barrio / Conjunto
          </label>
          <Input required />
        </div>
        <div>
          <label className="text-xs text-slate-500">Dirección</label>
          <Input required />
        </div>

        <div>
          <label className="text-xs text-slate-500">Teléfono</label>
          <Input required />
        </div>
        <div>
          <label className="text-xs text-slate-500">Categoría</label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Local</option>
            <option>Departamental</option>
            <option>Nacional</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Tipo de documento
          </label>
          <Select defaultValue="" required>
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
          <Input required />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Correo electrónico
          </label>
          <Input required />
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
              Documento de identidad
            </label>
            <Input type="file" className={fileClass} required />
          </div>
        </div>

        <div className="pt-2">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Certificados de curso
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">
                    Documento
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Nombre
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Año
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    Nivel
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((row) => (
                  <tr key={row} className="border-t border-slate-200">
                    <td className="px-3 py-2">
                      <Input type="file" className={fileClass} />
                    </td>
                    <td className="px-3 py-2">
                      <Input placeholder="Ej: Certificado nacional" />
                    </td>
                    <td className="px-3 py-2">
                      <Input type="number" placeholder="2024" />
                    </td>
                    <td className="px-3 py-2">
                      <Select defaultValue="">
                        <option value="" disabled>
                          Seleccione una opción
                        </option>
                        <option>Local</option>
                        <option>Departamental</option>
                        <option>Nacional</option>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TermsAndConditions />

      <div className="flex justify-end">
        <Button type="submit">Registrarse</Button>
      </div>

      <Modal
        open={submitStatus !== "idle"}
        title="Registro de árbitro"
        onClose={closeModal}
      >
        {submitStatus === "sending" ? (
          <div className="flex flex-col items-center justify-center gap-3 py-6 text-sm text-slate-600">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-league-600" />
            <div>Enviando registro...</div>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-slate-600">
            <div>Se guardo su registro.</div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={closeModal}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </form>
  );
};

export default ArbitroForm;
