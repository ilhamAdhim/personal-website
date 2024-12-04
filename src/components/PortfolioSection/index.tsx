import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import useSmallViewport from "hooks/useViewport";

import SocialList from "./SocialList";
import TechStackList from "./TechStackList";

const PortfolioAbout = () => {
  const { isSmallViewport } = useSmallViewport();

  return (
    <VStack
      p={8}
      top={[0, 0, 0, 10, 10, 24]}
      spacing={[4, 4, 4, 4, 3, 5]}
      rounded="lg"
      position="sticky"
      bgColor={useColorModeValue("white", "#1a202c")}
      borderColor={useColorModeValue("gray.700", "blue.200")}
      boxShadow={useColorModeValue("1px 1px 8px gray", "1px 1px 8px skyblue")}
    >
      <Box
        boxShadow="xl"
        borderRadius="full"
        data-aos={isSmallViewport ? "fade-down" : ""}
        data-aos-delay={isSmallViewport ? "1100" : 0}
      >
        <Avatar width={200} height={200} src="/images/my-profile.jpg" />
      </Box>
      <Heading
        fontSize={["lg", "xl"]}
        data-aos={isSmallViewport ? "fade-down" : ""}
        data-aos-delay={isSmallViewport ? "1200" : 0}
      >
        Muhammad Ilham Adhim
      </Heading>
      <Text
        color="gray.500"
        fontSize={["md", "lg"]}
        display="block"
        data-aos={isSmallViewport ? "fade-down" : ""}
        data-aos-delay={isSmallViewport ? "1300" : 0}
      >
        Front-End Developer
      </Text>

      <Divider />
      <Flex w="full" gap={4} flexDir={["column", "row"]}>
        <Box w={["full", "50%"]}>
          <Text
            fontSize={14}
            align="center"
            data-aos={isSmallViewport ? "fade-down" : ""}
            data-aos-delay={isSmallViewport ? "1300" : 0}
          >
            {" "}
            Favorite Tech Stack ⚡
          </Text>
          <TechStackList category="fav" />
        </Box>

        <Box>
          <Divider orientation="vertical" />
        </Box>

        <Box w={["full", "50%"]}>
          <Text
            fontSize={14}
            align="center"
            data-aos={isSmallViewport ? "fade-down" : ""}
            data-aos-delay={isSmallViewport ? "1300" : 0}
          >
            {" "}
            Other Tech Stack 🎯
          </Text>
          <TechStackList category="other" />
        </Box>
      </Flex>
      <Divider />
      <Box>
        <Text fontSize="1.2em" align="center" mb="4">
          Let's Collaborate ! 🙌
        </Text>
        <SocialList placementCaption="bottom" />
      </Box>
    </VStack>
  );
};

export default PortfolioAbout;
