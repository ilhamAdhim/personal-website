import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

const WeddingLayout = ({ children }: { children: ReactNode }) => (
    <Box margin="0 auto" transition="0.5s ease-out" scrollBehavior="smooth">
        <Header />
        <Box as="main">{children}</Box>
        <Footer />
    </Box>
);

export default WeddingLayout;
