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

type ClubAffiliation = "afiliado" | "no_afiliado";
type SubmitStatus = "idle" | "sending" | "success";

const fileClass =
  "file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-600";

const ClubForm = ({ formRef }: Props) => {
  const [affiliation, setAffiliation] = useState<
    ClubAffiliation | ""
  >("");
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const resetForm = () => {
    formRef.current?.reset();
    setAffiliation("");
  };

  const closeModal = () => {
    setSubmitStatus("idle");
    resetForm();
  };

  const isAffiliated = affiliation === "afiliado";
  const showForm = affiliation !== "";
  const requiredDoc = isAffiliated;
  const docSuffix = requiredDoc ? " (Obligatorio)" : " (Opcional)";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitStatus("sending");
    window.setTimeout(() => {
      setSubmitStatus("success");
    }, 1300);
  };

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          Registro de Clubes
        </h3>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Tipo de afiliacion
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setAffiliation("afiliado");
            }}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isAffiliated
                ? "border-league-600 bg-league-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Afiliado
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setAffiliation("no_afiliado");
            }}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              affiliation === "no_afiliado"
                ? "border-league-600 bg-league-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            No afiliado
          </button>
        </div>
      </div>

      {showForm && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-slate-500">Logo</label>
              <Input type="file" className={fileClass} required />
            </div>
            <div>
              <label className="text-xs text-slate-500">Nombre</label>
              <Input placeholder="Club Deportivo..." required />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Municipio
              </label>
              <Select defaultValue="" required>
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
              <Input required />
            </div>
            <div>
              <label className="text-xs text-slate-500">
                Direccion
              </label>
              <Input required />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Telefono 1
              </label>
              <Input required />
            </div>
            <div>
              <label className="text-xs text-slate-500">
                Telefono 2 (Opcional)
              </label>
              <Input />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Presidente
              </label>
              <Input required />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Correo electronico
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
                  RUT{docSuffix}
                </label>
                <Input
                  type="file"
                  className={fileClass}
                  required={requiredDoc}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">
                  Estatutos{docSuffix}
                </label>
                <Input
                  type="file"
                  className={fileClass}
                  required={requiredDoc}
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Reconocimiento deportivo{docSuffix}
                </label>
                <Input
                  type="file"
                  className={fileClass}
                  required={requiredDoc}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">
                  Personeria juridica{docSuffix}
                </label>
                <Input
                  type="file"
                  className={fileClass}
                  required={requiredDoc}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-slate-500">
                  Aceptacion de normas de la Liga (Obligatorio)
                </label>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="/documento-prueba.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Descargar normas
                  </a>
                  <Input type="file" className={fileClass} required />
                </div>
              </div>
            </div>
          </div>

          <TermsAndConditions />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitStatus === "sending"}
            >
              Registrarse
            </Button>
          </div>
        </>
      )}

      <Modal
        open={submitStatus !== "idle"}
        title="Registro de club"
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

export default ClubForm;
