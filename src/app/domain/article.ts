import {User} from './user';

export class Article {
  articleType = 'BLOG';
  author: User;
  id?: number;
  publishDate: Date;
  text?: string;
  title: string;
}
