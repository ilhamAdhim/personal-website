import { Box, Flex, Text } from "@chakra-ui/react";
import HeroSection from "components/HeroSection";
import MotionBox from "components/motion/Box";
import { FaArrowDown } from "react-icons/fa";

const Home = () => {
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      {/* <SomeImage /> */}
      ini dimana
      <Box>
        <HeroSection />
        <Flex justifyContent="center" marginTop={"8em"}>
          <MotionBox
            animate={{
              y: 10,
            }}
            transition={{
              from: 0,
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Text fontSize="2em" fontWeight="bold">
              <FaArrowDown />
              wowoapwopaw
            </Text>
          </MotionBox>
        </Flex>
        {/* <SomeText />
        <CTASection /> */}
      </Box>
    </Box>
  );
};

export default Home;
