import { Contributer } from './contributer';
import { Reference } from './reference.interface';

export interface Post {
  name: string;
  filePath: string;
}

export interface Medium {
  title: string;
  description: string;
  tags?: string[];
  owners?: string[] | undefined;
  contibuters?: Contributer[] | undefined;
  references?: Reference[];
  fileUrl: string;
  thumbnailUrl?: string;
}
