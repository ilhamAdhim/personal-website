import {
  Avatar,
  Box,
  Divider,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import SocialList from "./SocialList";
import TechStackList from "./TechStackList";

const PortfolioAbout = () => {
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
      <motion.div whileHover={{ y: -5, scale: 1.1 }}>
        <Box boxShadow="xl" _hover={{ boxShadow: "lg" }} borderRadius="full">
          <Avatar
            size="xl"
            _groupHover={{ width: "5rem", height: "5rem" }}
            src="https://avatars2.githubusercontent.com/u/37842853?v=4"
          />
        </Box>
      </motion.div>
      <Heading
        fontSize={["lg", "xl"]}
        data-aos="fade-down"
        data-aos-delay="1200"
      >
        Muhammad Ilham Adhim
      </Heading>
      <Text
        color="gray.500"
        fontSize="lg"
        display="block"
        data-aos="fade-down"
        data-aos-delay="1300"
      >
        Front-End Developer
      </Text>

      <Divider />
      <Box>
        <Text align="center" data-aos="fade-down" data-aos-delay="1300">
          {" "}
          Current Favorite Tech Stack ⚡
        </Text>
        <TechStackList />
      </Box>

      <Divider />
      <Box data-aos="fade-up" data-aos-delay="2000">
        <Text fontSize="1.2em" align="center" mb="4">
          Let's Collaborate ! 🙌
        </Text>
        <SocialList placementCaption="bottom" />
      </Box>
    </VStack>
  );
};

export default PortfolioAbout;
