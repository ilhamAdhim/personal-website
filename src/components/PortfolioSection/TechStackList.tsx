import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  SiChakraui,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiSass,
  SiTypescript,
} from "react-icons/si";

export interface ITechStackProps {
  icon: IconType;
  color?: string;
  description?: string;
}

const techStack: ITechStackProps[] = [
  {
    icon: SiNextdotjs,
    color: "teal",
    description: "Ini Next ",
  },
  {
    icon: SiJavascript,
    color: "#F0DB4F",
    description: "Ini SiJavascript",
  },
  {
    icon: SiReact,
    color: "cyan",
    description: "Ini SiReact",
  },
  {
    icon: SiChakraui,
    color: "cyan",
    description: "Ini SiChakraui",
  },
  {
    icon: SiRedux,
    color: "#764abc",
    description: "Ini SiRedux",
  },
  {
    icon: SiSass,
    color: "pink",
    description: "Ini SiSass",
  },
  {
    icon: SiTypescript,
    color: "#007acc",
    description: "Ini SiTypescript",
  },
];

const TechStackList = () => {
  return (
    <Flex
      mt="4"
      gap="4"
      w="100%"
      fontSize="2em"
      justify="center"
      alignItems="center"
      flexWrap={["wrap", "nowrap"]}
    >
      {techStack.map((item, index) => (
        <Tooltip
          hasArrow
          key={index}
          placement="bottom"
          label={item.description}
        >
          <Text
            as="span"
            _hover={{
              color: item.color,
            }}
          >
            <Icon as={item.icon} />
          </Text>
        </Tooltip>
      ))}
    </Flex>
  );
};

export default TechStackList;
