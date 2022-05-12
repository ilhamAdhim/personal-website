import { Image } from "@chakra-ui/react";

type LazyImageProps = {
  src: string;
  width?: number;
  height?: number;
  rounded?: string;
};

const LazyImage = (props: LazyImageProps) => {
  const { src, width, height, rounded } = props;

  return (
    <Image
      src={src}
      objectFit="cover"
      alt="cover image"
      width={width}
      height={height}
      rounded={rounded}
      loading="lazy"
    />
  );
};

export default LazyImage;
