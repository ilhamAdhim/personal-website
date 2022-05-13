import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function useSmallViewport() {
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsSmallViewport(isSmallScreen);
  }, [isSmallScreen]);

  return { isSmallViewport };
}

export default useSmallViewport;
