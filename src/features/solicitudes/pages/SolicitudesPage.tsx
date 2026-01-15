const tableHeaders = [
  "Tipo Solicitud",
  "Nombre",
  "Tipo de Usuario",
  "Estado",
  "Fecha Solicitud",
  "Ver",
];

const SolicitudesPage = () => {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold text-league-700">
          Solicitudes
        </h1>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-card-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-5 py-4 text-left font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="px-5 py-6"
                >
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm text-blue-700">
                    No hay solicitudes pendientes
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SolicitudesPage;
