export interface Thumbnail {
  _id: string;
  title: string;
  duration?: any;
  owners: string[];
  thumbnailUrl?: string;
  thumb_public_id?: string;
  file_public_id?: string;
  createdAt: string;
  fileType: string;
  description?: string;
}
