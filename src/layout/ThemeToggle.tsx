import { IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (
      localStorage.getItem("chakra-ui-color-mode") === "light" &&
      colorMode === "dark"
    ) {
      setTimeout(() => toggleColorMode(), 500);
    } else if (
      localStorage.getItem("chakra-ui-color-mode") === "dark" &&
      colorMode === "light"
    ) {
      setTimeout(() => toggleColorMode(), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
