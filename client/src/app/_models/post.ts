import { Contributer } from './contributer';
import { Citation } from './reference.interface';

export interface Post {
  name: string;
  filePath: string;
}

export class Medium {
  _id!: string;
  title!: string;
  description!: string;
  tags?: string[];
  owners?: string[] | undefined;
  contibuters?: Contributer[] | undefined;
  citations?: Citation[];
  fileUrl!: string;
  fileType!: 'video' | 'audio' | 'image';
  thumbnailUrl?: string;
}
