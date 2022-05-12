import { IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (
      (localStorage.getItem("chakra-ui-color-mode") === "light" &&
        colorMode === "dark") ||
      (localStorage.getItem("chakra-ui-color-mode") === "dark" &&
        colorMode === "light")
    ) {
      setTimeout(() => toggleColorMode(), 500);
    }
  }, [colorMode, toggleColorMode]);

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
