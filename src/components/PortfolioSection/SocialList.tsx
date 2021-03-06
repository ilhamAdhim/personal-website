import {
  Flex,
  Link,
  Text,
  Tooltip,
  useClipboard,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import TooltipContent from "components/TooltipContent";
import type {
  ISocialIconsProps,
  ITooltipPlacementProps,
} from "types/SocialListProps";

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
    id: 1,
    icon: <FaEnvelope />,
    name: "Email",
    description: "Click the mail logo to copy",
    email: "ilhamm179@gmail.com",
    type: "social",
  },
  {
    id: 2,
    icon: <FaGithub />,
    name: "Github",
    url: "https://github.com/ilhamAdhim",
    description: "Check out my projects on",
    type: "social",
  },
  {
    id: 3,
    icon: <FaLinkedin />,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-ilham-adhim/",
    description: "Find me on",
    type: "social",
  },
];

const SocialList = ({ placementCaption = "top" }: ITooltipPlacementProps) => {
  const [dataSocialIcons, setDataSocialIcons] = useState<ISocialIconsProps[]>(
    []
  );

  useEffect(() => {
    setDataSocialIcons(socialIcons);
  }, []);

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
    <Flex alignItems="center" justify="center" w="100%" gap="4">
      {dataSocialIcons?.map((icon) => (
        <Tooltip
          key={icon.id}
          hasArrow
          label={<TooltipContent {...icon} />}
          placement={placementCaption}
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
    </Flex>
  );
};

export default SocialList;
