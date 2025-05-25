"use client";

import { AspectRatio, ImageConfig } from "@/types/ImageConfig";
import NextImage from "next/image";
import React from "react";
import { FC } from "react";

export const EasyImage: FC<ImageConfig> = ({
  url,
  objectPosition,
  aspectRatio = AspectRatio.HORIZONTAL,
  className,
}) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <div
      className={className}
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
        aspectRatio: aspectRatio ? aspectRatio : "auto",
      }}
    >
      <div
        style={{ width: "100%", height: "100%" }}
        className={`skeleton ${!loading ? "hidden" : ""}`}
      ></div>
      <NextImage
        src={url}
        style={{
          objectFit: "cover",
          objectPosition: objectPosition,
          opacity: loading ? 0 : 1,
          transition: "opacity 0.2s",
        }}
        fill
        alt="Me and my brother-in-law holding up Gamecube controllers"
        onLoad={() => {
          setLoading(false);
        }}
      />
    </div>
  );
};
