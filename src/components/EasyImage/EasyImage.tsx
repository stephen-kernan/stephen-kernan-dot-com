import { ImageConfig } from "@/types/ImageConfig";
import NextImage from "next/image";
import { FC } from "react";

export const EasyImage: FC<ImageConfig> = ({
  url,
  objectPosition,
  aspectRatio,
}) => {
  return (
    <div
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        aspectRatio: aspectRatio,
      }}
    >
      <NextImage
        src={url}
        style={{ objectFit: "cover", objectPosition: objectPosition }}
        fill
        alt="Me and my brother-in-law holding up Gamecube controllers"
      />
    </div>
  );
};
