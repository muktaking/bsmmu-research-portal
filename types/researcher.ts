export interface ResearcherType {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  designation: string;
  institute: string;
  institute_id?: number;
  degree: string;
  email: string;
  phone?: string;
  Publication?: [string]; // Arrays of id
  social_media?: SocialMediaType;
  awards?: [string]; // Arrays of string
  int_affiliation?: [string]; // Arrays of string
  editor_in_Journal?: [string]; // Arrays of string
  citation_num?: number;
  publication_num?: number;
}

interface SocialMediaType {
  fb_link: string;
  tw_link: string;
  li_link: string;
}

export enum Institute {
  bmu = 1,
  nimh = 2,
  somch = 3,
  afmc = 4,
  foreign = 6,
  local = 7,
}

export function instituteCode(name: string): number {
  switch (name) {
    case 'bmu':
      return 1;
    case 'nimh':
      return 2;
    case 'somch':
      return 3;
    case 'afmc':
      return 4;
    case 'foreign':
      return 6;
    case 'local':
      return 7;
    default:
      return 0;
  }
}
