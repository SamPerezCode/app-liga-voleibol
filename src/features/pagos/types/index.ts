export type PaymentStatus = "paid" | "pending" | "unpaid";

export type Payment = {
  id: string;
  type: string;
  amount: number;
  reference: string;
  method: string;
  status: PaymentStatus;
  paidAt: string;
};
