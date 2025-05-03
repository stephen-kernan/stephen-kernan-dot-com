import { EasyImage } from "@/components/EasyImage/EasyImage";
import { AspectRatio, ImageConfig, ObjectPosition } from "@/types/ImageConfig";
import { ReactNode } from "react";

const images: ImageConfig[] = [
  {
    url: "/us.webp",
    aspectRatio: AspectRatio.HORIZONTAL,
  },
  {
    url: "/closeup.webp",
    aspectRatio: AspectRatio.VERTICAL,
  },
  {
    url: "/linus.webp",
    aspectRatio: AspectRatio.HORIZONTAL,
  },
  {
    url: "/pongo.webp",
    aspectRatio: AspectRatio.SQUARE,
    objectPosition: ObjectPosition.TOP,
  },
];

export default async function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="split-page">
      <div className="main-content blog-post">{children}</div>
      <div className="side-content">
        <div className="side-image-gallery">
          {images.map((image: ImageConfig) => (
            <EasyImage key={image.url} {...image} />
          ))}
        </div>
      </div>
    </div>
  );
}
