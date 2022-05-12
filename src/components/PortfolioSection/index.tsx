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
import { motion } from "framer-motion";

import SocialList from "./SocialList";
import TechStackList from "./TechStackList";

const PortfolioAbout = () => {
  return (
    <VStack
      bgColor={useColorModeValue("white", "#1a202c")}
      p="10"
      top="40"
      spacing={5}
      rounded="lg"
      position="sticky"
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
      <Heading fontSize={["lg", "xl"]}>Muhammad Ilham Adhim</Heading>
      <Text color="gray.500" fontSize="lg" display="block">
        Front-End Developer
      </Text>

      <Divider />

      <Box>
        <Text align="center"> Current Favorite Tech Stack ⚡</Text>
        <TechStackList />
      </Box>

      <Divider />

      <Text fontSize="1.2em" align="center">
        Let's Collaborate ! 🙌
      </Text>
      <Flex alignItems="center" justify="center" w="100%" gap="4">
        <SocialList placementCaption="bottom" />
      </Flex>
    </VStack>
  );
};

export default PortfolioAbout;
