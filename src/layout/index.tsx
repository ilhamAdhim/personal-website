import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out">
      <Header />
      <Box as="main" marginY={22} p={["0", "0", "0", "1em 10em"]}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
