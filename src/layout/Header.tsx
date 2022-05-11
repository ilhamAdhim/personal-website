import { Box, Flex, Spacer, chakra, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import ThemeToggle from "./ThemeToggle";

interface IHeaderProps {
  text: string;
  link: string;
}

const navList: IHeaderProps[] = [
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
    <Flex
      p={["1em", "1em", "1em 10em"]}
      top="0"
      zIndex="1"
      as="header"
      align="flex-start"
      position="sticky"
      bgColor={useColorModeValue("gray.100", "gray.900")}
    >
      <Flex gap={[2, 8]}>
        {navList.map((nav, id) => (
          <chakra.div
            key={id}
            className="nav-links"
            _after={{
              backgroundColor:
                router.pathname === nav.link ? "gray.300" : "teal.600",
            }}
          >
            <Box verticalAlign="middle">
              <chakra.div
                color={router.pathname === nav.link ? "teal.600" : "unset"}
                fontWeight={router?.pathname === nav.link ? "bold" : "normal"}
                mt="2"
              >
                <Link href={nav.link} passHref>
                  {nav.text}
                </Link>
              </chakra.div>
            </Box>
            <Spacer />
          </chakra.div>
        ))}
      </Flex>

      <Spacer />
      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
