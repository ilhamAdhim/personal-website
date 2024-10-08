import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { FaCode, FaHome, FaList, FaPen, FaUser } from "react-icons/fa";

import useSmallViewport from "hooks/useViewport";

import LanguageChange from "./LanguageChange";
import ThemeToggle from "./ThemeToggle";

interface IHeaderProps {
  id: string;
  text: string;
  link: string;
  icon?: ReactElement;
}

const navList: IHeaderProps[] = [
  {
    id: "nav-1",
    text: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    id: "nav-2",
    text: "Projects",
    link: "/projects",
    icon: <FaCode />,
  },
  {
    id: "nav-3",
    text: "Blog",
    link: "/blog",
    icon: <FaPen />,
  },
  {
    id: "nav-4",
    text: "About",
    link: "/about",
    icon: <FaUser />,
  },
];

const HeaderSmallScreen = () => {
  const router = useRouter();
  const navActiveColor = useColorModeValue("teal.600", "teal.400");

  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<FaList />}
        variant="outline"
      />
      <MenuList>
        {navList.map((nav) => (
          <chakra.div key={nav.id}>
            <Link href={nav.link} passHref>
              <MenuItem icon={nav.icon}>
                <chakra.div
                  color={
                    router?.pathname === nav.link ? navActiveColor : "unset"
                  }
                  fontWeight={router?.pathname === nav.link ? "bold" : "normal"}
                >
                  {nav.text}
                </chakra.div>
              </MenuItem>
            </Link>
          </chakra.div>
        ))}
      </MenuList>
    </Menu>
  );
};

const HeaderLargeScreen = () => {
  const router = useRouter();
  const hoverColorNav = useColorModeValue("gray.500", "gray.300");
  const navActiveColor = useColorModeValue("teal.600", "teal.400");

  return (
    <Flex gap={[2, 8]}>
      {navList.map((nav) => (
        <chakra.div
          key={nav.id}
          className="nav-links"
          _hover={{
            color: hoverColorNav,
          }}
        >
          <Box verticalAlign="middle">
            <chakra.div
              color={router.pathname === nav.link ? navActiveColor : "unset"}
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
  );
};

const Header = () => {
  const router = useRouter();
  const { isSmallViewport } = useSmallViewport();
  const bgColorNav = useColorModeValue("gray.100", "gray.900");
  const fontColorNav = useColorModeValue("gray.900", "gray.100");

  return (
    <Flex
      className="header"
      p={["1em", "1em", "1em 10em"]}
      top="0"
      zIndex="1"
      as="header"
      align="flex-start"
      position="sticky"
      justifyContent="space-between"
      bgColor={bgColorNav}
      color={fontColorNav}
    >
      {isSmallViewport ? <HeaderSmallScreen /> : <HeaderLargeScreen />}

      <Box display="flex" justifyContent="space-evenly" gap="1em">
        {!router.pathname.includes("blog") && <LanguageChange />}
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
