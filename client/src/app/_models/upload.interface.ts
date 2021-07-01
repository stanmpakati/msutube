import { UploadStatus } from './enums/upload-status.enum';

export interface Upload {
  status: UploadStatus;
  percentage: number;
}
