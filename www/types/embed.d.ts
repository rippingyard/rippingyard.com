export type EmbedStatus = 'hidden' | 'loading' | 'shown';

export type Embed = {
  title?: string
  site?: string
  description?: string
  image?: string
  url?: string
  html?: string
  error?: string
  status?: EmbedStatus;
}