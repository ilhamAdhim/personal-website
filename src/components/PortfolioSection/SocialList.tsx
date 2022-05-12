import {
  Link,
  PlacementWithLogical,
  Text,
  Tooltip,
  useClipboard,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import TooltipContent from "components/TooltipContent";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import {
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
    icon: <FaEnvelope />,
    name: "Email",
    description: "Click the mail logo to copy",
    email: "ilhamm179@gmail.com",
    type: "social",
  },
  {
    icon: <FaGithub />,
    name: "Github",
    url: "https://github.com/ilhamAdhim",
    description: "Check out my projects on",
    type: "social",
  },
  {
    icon: <FaLinkedin />,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/muhammad-ilham-adhim/",
    description: "Find me on",
    type: "social",
  },
];

const SocialList = ({ placementCaption = "top" }: ITooltipPlacementProps) => {
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
    </>
  );
};

export default SocialList;
