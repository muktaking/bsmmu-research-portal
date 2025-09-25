import { ResearcherType } from './researcher';

export interface ScaleType {
  id: number;
  title: string;
  short_title: string;
  authors: [ResearcherType]; // Arrays of string
  author_id: [number]; // Arrays of id
  author_name: [number];
  validators: [ResearcherType]; // Arrays of string
  validator_id: [number]; // Arrays of id
  validator_name: [number]; // Arrays of id
  description: string;
  publication_link: string;
  tags: [string]; // Arrays of string;
  server_link: string;
  validation_year: string;
}
