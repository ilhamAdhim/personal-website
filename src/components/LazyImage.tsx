import * as React from "react";
import { Image } from "@chakra-ui/react";

type LazyImageProps = {
  src: string;
  size?: string;
  width?: number;
  height?: number;
  rounded?: string;
};

const LazyImage = (props: LazyImageProps) => {
  const { src, width, height, size, rounded } = props;

  return (
    <Image
      src={src}
      objectFit="cover"
      alt="cover image"
      width={width}
      height={height}
      // sizes={size}
      rounded={rounded}
      loading="lazy"
    />
  );
};

export default LazyImage;
