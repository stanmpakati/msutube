export interface Upload {
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'ERROR';
  percentage: number;
}
