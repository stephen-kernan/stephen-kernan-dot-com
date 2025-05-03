export enum AspectRatio {
  VERTICAL = 0.75,
  SQUARE = 1,
  HORIZONTAL = 1.25,
}

export enum ObjectPosition {
  TOP = "top",
  CENTER = "center",
  BOTTOM = "bottom",
}

export interface ImageConfig {
  url: string;
  aspectRatio?: AspectRatio;
  objectPosition?: ObjectPosition;
  className?: string
}
