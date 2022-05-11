import {
  Link,
  Text,
  Tooltip,
  useClipboard,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  ISocialIconsProps,
  ITooltipSocialContentProps,
} from "types/SocialList";

export const iconStyles = (colorMode: string) => {
  return {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "1.5em",
    _hover: {
      color: colorMode === "light" ? "gray.500" : "teal.500",
    },
  };
};

export const socialIcons: ISocialIconsProps[] = [
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

export const TooltipContent = (param: ITooltipSocialContentProps) => {
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

const SocialList = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [value] = useState("ilhamm179@gmail.com");
  const { onCopy } = useClipboard(value);

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
    <>
      {socialIcons.map((icon, id) => (
        <Tooltip
          hasArrow
          key={id}
          label={<TooltipContent {...icon} />}
          placement="top"
        >
          {icon?.name === "Email" ? (
            <Text as="span" {...iconStyles(colorMode)} onClick={handleCopy}>
              {icon.icon}
            </Text>
          ) : (
            <Link href={icon.url} isExternal>
              <Text as="span" {...iconStyles(colorMode)}>
                {icon.icon}
              </Text>
            </Link>
          )}
        </Tooltip>
      ))}
    </>
  );
};

export default SocialList;
