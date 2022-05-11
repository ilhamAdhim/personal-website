import {
  chakra,
  Divider,
  Flex,
  Link,
  Text,
  TextProps,
  Tooltip,
  useClipboard,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useMemo, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const socialIcons = [
  {
    icon: <FaEnvelope />,
    name: "Email",
    description: "Click the mail logo to copy",
    email: "ilhamm179@gmail.com",
  },
  {
    icon: <FaGithub />,
    name: "Github",
    url: "https://github.com/ilhamAdhim",
    description: "Check out my projects on",
  },
  {
    icon: <FaLinkedin />,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-ilham-adhim/",
    description: "Find me on",
  },
];

const Footer = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [value] = useState("ilhamm179@gmail.com");
  const { onCopy } = useClipboard(value);

  const iconStyles: TextProps = useMemo(() => {
    return {
      as: "span",
      display: "flex",
      alignItems: "center",
      fontSize: "1.5em",
      _hover: {
        color: colorMode === "light" ? "gray.500" : "teal.500",
      },
    };
  }, []);

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Email Copied!",
      variant: "subtle",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
  };

  return (
    <chakra.div mt="20">
      <Divider />
      <Flex as="footer" width="full" justify="center" gap="4" mt="5">
        {socialIcons.map((icon, id) => (
          <Tooltip
            hasArrow
            key={id}
            label={<TooltipContent {...icon} />}
            placement="top"
          >
            {icon?.name === "Email" ? (
              <Text {...iconStyles} onClick={handleCopy}>
                {icon.icon}
              </Text>
            ) : (
              <Link href={icon.url} isExternal>
                <Text {...iconStyles}>{icon.icon}</Text>
              </Link>
            )}
          </Tooltip>
        ))}
      </Flex>
      <Text align="center" mt="6">
        <Link
          href="https://www.github.com/ilhamadhim"
          isExternal
          rel="noopener noreferrer"
        >
          ©️ Muhammad Ilham Adhim
        </Link>
        {" - "} {new Date().getFullYear()}
      </Text>
    </chakra.div>
  );
};

export default Footer;

interface TooltipSocialContentProps {
  name: string;
  url?: string;
  description: string;
  icon: ReactNode;
  email?: string;
}

const TooltipContent = (param: TooltipSocialContentProps) => {
  return (
    <>
      <Text as="div" align="center">
        {param.description}
        <Text as="span" align="justify" color="teal" textDecor={"underline"}>
          {" "}
          {param.hasOwnProperty("email") ? param.email : param.name}
        </Text>
      </Text>
    </>
  );
};
