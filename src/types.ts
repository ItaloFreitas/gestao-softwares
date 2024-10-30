export interface Software {
  id: string;
  name: string;
  url: string;
  analysisDate: string;
  status: 'Homologado' | 'Não Homologado';
  rejectionReason?: string;
  analystName: string;
}

export type SortField = keyof Software;
export type SortDirection = 'asc' | 'desc';