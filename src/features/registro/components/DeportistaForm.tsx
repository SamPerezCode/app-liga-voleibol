import { useState, type RefObject } from "react";
import { municipiosCesar } from "../../../app/mocks/cesarMunicipios";
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

const positionOptions = [
  "Armador",
  "Líbero",
  "Central",
  "Auxiliar",
  "Opuesto",
];

const documentOptions = [
  "Cédula de ciudadanía",
  "Tarjeta de identidad",
  "Pasaporte",
  "Permiso especial de permanencia (PEP)",
];

const DeportistaForm = ({ formRef }: Props) => {
  const [nationality, setNationality] = useState("colombiano");
  const [birthDepartment, setBirthDepartment] = useState("Cesar");
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
  const birthInCesar = birthDepartment === "Cesar";
  const residenceInCesar = residenceDepartment === "Cesar";

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          Registro de Deportistas
        </h3>
        <p className="text-xs text-slate-500">
          Completa los datos personales y documentos del deportista.
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
          <Input placeholder="Nombre y apellido" required />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Fecha de nacimiento
          </label>
          <Input type="date" required />
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
          <>
            <div>
              <label className="text-xs text-slate-500">
                Departamento de nacimiento
              </label>
              <Select
                value={birthDepartment}
                onChange={(e) => setBirthDepartment(e.target.value)}
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
                Municipio de nacimiento
              </label>
              {birthInCesar ? (
                <Select defaultValue="" required>
                  <option value="" disabled>
                    Seleccione una opción
                  </option>
                  {municipiosCesar.map((mun) => (
                    <option key={mun}>{mun}</option>
                  ))}
                </Select>
              ) : (
                <Input placeholder="Municipio de nacimiento" />
              )}
            </div>
          </>
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
          <Input required />
        </div>
        <div>
          <label className="text-xs text-slate-500">Dirección</label>
          <Input required />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Estatura (cm)
          </label>
          <Input type="number" required />
        </div>
        <div>
          <label className="text-xs text-slate-500">Peso (kg)</label>
          <Input type="number" />
        </div>

        <div>
          <label className="text-xs text-slate-500">
            Grupo sanguíneo
          </label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Género</label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Masculino</option>
            <option>Femenino</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">Club</label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Club Deportivo Alpha Voley</option>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">
            Aprobación a cargo de
          </label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Club</option>
            <option>Liga (Administrador)</option>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-500">Posición</label>
          <Select defaultValue="" required>
            <option value="" disabled>
              Seleccione una opción
            </option>
            {positionOptions.map((position) => (
              <option key={position}>{position}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500">Teléfono</label>
          <Input required />
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
            <Input type="file" className={fileClass} required />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Registro civil (Opcional)
            </label>
            <Input type="file" className={fileClass} />
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Certificado EPS
            </label>
            <Input type="file" className={fileClass} required />
          </div>
        </div>
      </div>

      <TermsAndConditions />

      <div className="flex justify-end">
        <Button type="submit">Registrarse</Button>
      </div>

      <Modal
        open={submitStatus !== "idle"}
        title="Registro de deportista"
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

export default DeportistaForm;
