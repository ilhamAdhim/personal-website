import { useEffect, useRef } from "react";
import type { ImgHTMLAttributes } from "react";

/**
 * <img> that reliably reports a missing file. A server-rendered image can fail
 * before React attaches onError, so it also checks once on mount.
 */
const SafeImg = ({
  onFail,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { onFail: () => void }) => {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) onFail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line jsx-a11y/alt-text, react/jsx-props-no-spreading
  return <img ref={ref} {...props} onError={onFail} />;
};

export default SafeImg;
