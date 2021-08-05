import { Contributer } from './contributer';
import { Citation } from './reference.interface';

export class Post {
  _id!: string;
  title!: string;
  description!: string;
  tags?: string[];
  owners!: string[];
  contibuters?: Contributer[] | undefined;
  citations?: Citation[];
  fileUrl!: string;
  fileType!: 'video' | 'audio' | 'image';
  thumbnailUrl?: string;
  createdAt?: string;
}
