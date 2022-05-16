import { extendTheme } from "@chakra-ui/react";

import Button from "./components/button";
import fonts from "./fonts";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  fonts,
  components: { Button },
});

export default customTheme;
