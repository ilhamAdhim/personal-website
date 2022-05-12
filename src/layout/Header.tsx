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
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { FaCode, FaHome, FaList, FaPen, FaUser } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

interface IHeaderProps {
  id: number;
  text: string;
  link: string;
  icon?: ReactElement;
}

const navList: IHeaderProps[] = [
  {
    id: 1,
    text: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    id: 2,
    text: "Projects",
    link: "/Projects",
    icon: <FaCode />,
  },
  {
    id: 3,
    text: "Blog",
    link: "/Blog",
    icon: <FaPen />,
  },
  {
    id: 4,
    text: "About",
    link: "/About",
    icon: <FaUser />,
  },
];

const HeaderSmallScreen = () => {
  return (
    <Menu>
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
              <MenuItem icon={nav.icon} command="⌘T">
                {nav.text}
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
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const fontColorNav = useColorModeValue("gray.900", "gray.100");
  const bgColorNav = useColorModeValue("gray.100", "gray.900");

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
      {isSmallScreen ? <HeaderSmallScreen /> : <HeaderLargeScreen />}

      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
