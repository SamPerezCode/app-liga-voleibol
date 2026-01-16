import StatusBadge from "../../../ui/StatusBadge";
import type { Payment } from "../types";

type Props = {
  items: Payment[];
};

const formatMoney = (value: number) =>
  value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const PaymentsCardsMobile = ({ items }: Props) => {
  return (
    <div className="space-y-3 lg:hidden">
      {items.map((pay) => (
        <div
          key={pay.id}
          className="rounded-xl border border-slate-200 bg-white/85 p-4 shadow-card-soft"
        >
          <div className="text-xs uppercase text-slate-400">
            Tipo de Pago
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-700">
            {pay.type}
          </div>

          <div className="mt-3 text-sm text-slate-600">
            <span className="text-slate-400">Monto: </span>
            {formatMoney(pay.amount)}
          </div>

          <div className="mt-2 text-xs text-slate-500 break-words">
            Ref: {pay.reference}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <StatusBadge
              label={
                pay.status === "paid"
                  ? "Pagado"
                  : pay.status === "pending"
                  ? "Pendiente"
                  : "Sin pago"
              }
              tone={
                pay.status === "paid"
                  ? "paid"
                  : pay.status === "pending"
                  ? "pending"
                  : "unpaid"
              }
            />
            <span className="text-xs text-slate-500">
              {pay.paidAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsCardsMobile;
