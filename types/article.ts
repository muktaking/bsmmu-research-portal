import { ResearcherType } from './researcher';

export interface ArticleType {
  id: number;
  doi: string;
  title: string;
  description: string;
  authors: [ResearcherType];
  author_id: [number];
  author_name: [string];
  publication_link: string;
  tags: [string];
  server_link: string;
  published_year: string;
  publisher: string;
}
