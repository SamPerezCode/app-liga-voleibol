export type DocumentStatus = "approved" | "pending";

export type Documento = {
  id: string;
  type: string;
  status: DocumentStatus;
  fileUrl: string;
  startDate?: string;
  endDate?: string;
  resolutionNumber?: string;
};
