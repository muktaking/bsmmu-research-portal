export interface ResearcherType {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  designation: string;
  institute: string;
  degree: string;
  email: string;
  phone?: string;
  Publication?: [string]; // Arrays of id
  social_media?: SocialMediaType;
  awards?: [string]; // Arrays of string
  int_affiliation?: [string]; // Arrays of string
  editor_in_Journal?: [string]; // Arrays of string
}

interface SocialMediaType {
  fb_link: string;
  tw_link: string;
  li_link: string;
}
