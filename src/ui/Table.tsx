import type { ReactNode } from "react";

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
};

function Table<T extends { id?: string | number }>({
  columns,
  data,
  emptyMessage = "No hay registros",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((col) => (
              <th
                key={col.label}
                scope="col"
                className={`px-4 py-3 text-left font-semibold ${
                  col.className ?? ""
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-sm text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="border-t border-slate-100"
              >
                {columns.map((col) => (
                  <td
                    key={`${String(col.key)}-${rowIndex}`}
                    className="px-4 py-3 text-slate-700"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
