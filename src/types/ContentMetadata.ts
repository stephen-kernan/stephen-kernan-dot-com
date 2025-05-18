export interface ContentMetadata {
  slug: string;
  url: string;
  date: Date;
  lastUpdated: Date;
  title: string;
  excerpt: string;
  tags: string[];
}

export default ContentMetadata;
