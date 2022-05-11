import * as React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Avatar,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used framer-motion package for animations
import { motion } from "framer-motion";
import SocialList from "./SocialList";

import {
  SiAntdesign,
  SiChakraui,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const PortfolioAbout = () => {
  return (
    <VStack
      p="10"
      top="40"
      spacing={5}
      rounded={"lg"}
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
      <Heading
        noOfLines={2}
        fontSize="xl"
        fontFamily="body"
        textTransform="capitalize"
      >
        Muhammad Ilham Adhim
      </Heading>
      <Text
        noOfLines={{ base: 3, md: 4 }}
        color="gray.500"
        fontSize="lg"
        _groupHover={{ display: "none" }}
        display="block"
      >
        Front-End Developer
      </Text>

      <Divider />

      <Box>
        <Text align="center"> Current Favorite Tech Stack </Text>
        <Flex
          mt="4"
          alignItems="center"
          justify="center"
          w="100%"
          gap="4"
          fontSize="2em"
        >
          <SiNextdotjs />
          <SiNodedotjs />
          <SiReact />
          <SiChakraui />
          <SiAntdesign />
          <SiTypescript />
        </Flex>
      </Box>
      <Divider />
      <Text fontSize="1.2em" align="center">
        {" "}
        Let's Collaborate !{" "}
      </Text>
      <Flex alignItems="center" justify="center" w="100%" gap="4">
        <SocialList />
      </Flex>
    </VStack>
  );
};

export default PortfolioAbout;
