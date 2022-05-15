import {
  Avatar,
  Box,
  Divider,
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
      p="10"
      top="40"
      spacing={5}
      rounded="lg"
      position="sticky"
      bgColor={useColorModeValue("white", "#1a202c")}
      borderColor={useColorModeValue("gray.700", "blue.200")}
      boxShadow={useColorModeValue("1px 1px 8px gray", "1px 1px 8px skyblue")}
    >
      <Box
        boxShadow="xl"
        data-aos={isSmallViewport ? "fade-down" : ""}
        data-aos-delay={isSmallViewport ? "1100" : 0}
        // data-aos-once="true"
        borderRadius="full"
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
        fontSize="lg"
        display="block"
        data-aos={isSmallViewport ? "fade-down" : ""}
        data-aos-delay={isSmallViewport ? "1300" : 0}
      >
        Front-End Developer
      </Text>

      <Divider />
      <Box>
        <Text
          align="center"
          data-aos={isSmallViewport ? "fade-down" : ""}
          data-aos-delay={isSmallViewport ? "1300" : 0}
        >
          {" "}
          Current Favorite Tech Stack ⚡
        </Text>
        <TechStackList />
      </Box>

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
