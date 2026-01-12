export interface SuccessCase {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
  content?: string;
  locale?: string;
}

// Legacy Blog type (keep for backwards compatibility)
export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  authorImage: string;
  content?: string;
}
