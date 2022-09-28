import type { BoxProps } from "@chakra-ui/react";
import {
  Box,
  Circle,
  Flex,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import type React from "react";
import type { ReactElement } from "react";
import { FiCheckCircle } from "react-icons/fi";

export interface TimelineItemProps extends BoxProps {
  pointTitle: string;
  subDesc: string;
  icon?: ReactElement;
  boxProps?: BoxProps;
  skipTrail?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  icon = <FiCheckCircle />,
  boxProps = {},
  skipTrail = false,
  children,
  pointTitle,
  subDesc,
  ...props
}) => {
  const color = useColorModeValue("gray.700", "gray.400");

  const colorTitle = useColorModeValue("gray.700", "gray.200");
  return (
    <Flex minH={20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue("gray.600", "gray.500")}
          opacity={useColorModeValue(0.07, 0.15)}
          sx={{}}
        />
        <Text
          fontSize="1.25rem"
          color={color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        >
          {icon}
        </Text>
        {!skipTrail && <Box w="1px" flex={1} bg={colorTitle} my={1} />}
      </Flex>
      <Box pt={3} {...boxProps}>
        <chakra.span fontSize="xl" color={colorTitle}>
          {pointTitle}
        </chakra.span>
        <Box mt="2" mb="2" color={color}>
          <Text style={{ fontStretch: "expanded" }} fontSize="md">
            {subDesc}
          </Text>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default TimelineItem;
