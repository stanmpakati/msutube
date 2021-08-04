export interface Description {
  _id: string;
  title: string;
  description: string;
  tags?: string[];
  createdAt?: string;
  views: number;
  likes: number;
}
