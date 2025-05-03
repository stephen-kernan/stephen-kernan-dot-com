import ContentMetadata from "./ContentMetadata";

export type BlogFilter = (metadata: ContentMetadata) => ContentMetadata;
export type BlogOrder = (m1: ContentMetadata, m2: ContentMetadata) => number