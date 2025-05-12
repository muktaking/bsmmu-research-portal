export interface ArticleType {
  id: number;
  doi: string;
  title: string;
  summary: string;
  author: [string];
  author_id: [number];
  publication_link: string;
  tags: [string];
  server_link: string;
  published_year: string;
  publisher: string;
}
