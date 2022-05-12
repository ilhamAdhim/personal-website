import {
  Box,
  Flex,
  Spacer,
  chakra,
  useColorModeValue,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { FaCode, FaHome, FaList, FaPen, FaUser } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

interface IHeaderProps {
  text: string;
  link: string;
  icon?: ReactElement;
}

const navList: IHeaderProps[] = [
  {
    text: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    text: "Projects",
    link: "/Projects",
    icon: <FaCode />,
  },
  {
    text: "Blog",
    link: "/Blog",
    icon: <FaPen />,
  },
  {
    text: "About",
    link: "/About",
    icon: <FaUser />,
  },
];

const Header = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

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
      bgColor={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.900", "gray.100")}
    >
      {isSmallScreen ? <HeaderSmallScreen /> : <HeaderLargeScreen />}

      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;

const HeaderSmallScreen = () => {
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaList />}
          variant="outline"
        />
        <MenuList>
          {navList.map((item, index) => (
            <chakra.div key={index}>
              <Link href={item.link} passHref>
                <MenuItem icon={item.icon} command="⌘T">
                  {item.text}
                </MenuItem>
              </Link>
            </chakra.div>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

const HeaderLargeScreen = () => {
  const router = useRouter();

  return (
    <>
      <Flex gap={[2, 8]}>
        {navList.map((nav, id) => (
          <chakra.div
            key={id}
            className="nav-links"
            // _after={{
            //   // bgGradient: "linear(to-r, #0ea5e9,#2563eb)",
            // }}

            _hover={{
              color: useColorModeValue("gray.500", "gray.300"),
            }}
          >
            <Box verticalAlign="middle">
              <chakra.div
                color={
                  router.pathname === nav.link
                    ? useColorModeValue("teal.600", "teal.400")
                    : "unset"
                }
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
    </>
  );
};
