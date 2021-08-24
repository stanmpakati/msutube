import { Contributer } from './contributer';
import { Citation } from './reference.interface';

export class Post {
  _id!: string;
  title!: string;
  description!: string;
  tags?: string[];
  owners!: string[];
  contributers?: Contributer[] | undefined;
  citations?: Citation[];
  fileUrl!: string;
  fileType!: string;
  thumbnailUrl?: string;
  createdAt?: string;
  isFeatured?: boolean;
  views: number = 0;
  likes: number = 0;
}
