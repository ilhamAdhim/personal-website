import { Box, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ThemeToggle from "./ThemeToggle";

const navList = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Projects",
    link: "/Projects",
  },
  {
    text: "Blog",
    link: "/Blog",
  },
  {
    text: "About",
    link: "/About",
  },
];

const Header = () => {
  const router = useRouter();

  return (
    <Flex as="header" width="full" align="flex-start">
      <Flex gap={[2, 8]}>
        {navList.map((nav) => (
          <>
            <Box verticalAlign="middle">
              <span
                style={{
                  textDecoration:
                    router?.pathname === nav.link ? "underline" : "none",
                  fontWeight: router?.pathname === nav.link ? "bold" : "normal",
                }}
              >
                <Link href={nav.link} passHref>
                  {nav.text}
                </Link>
              </span>
            </Box>
            <Spacer />
          </>
        ))}
      </Flex>

      <Box marginLeft="auto">
        <Flex align="center" />
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
