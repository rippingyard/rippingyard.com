export type Seed = {
  body: string;
  created_at: string;
  deleted_at: string;
  id: number;
  image_id?: string;
  lat?: number;
  leading?: string;
  lng?: number;
  parent_id?: string;
  published_at: string;
  rate?: number;
  search_body?: string;
  slug: string;
  status: 'published' | 'drafted' | 'private';
  title: string;
  type: string;
  updated_at: string;
  user_id: number;
}
